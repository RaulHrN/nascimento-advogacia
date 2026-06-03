"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "./utils";

const THEMES = {
  light: ":root",
  dark: ".dark",
} as const;

type ThemeName = keyof typeof THEMES;

type ChartValue = string | number | Array<string | number>;
type ChartName = string | number;

type RechartsTooltipProps = RechartsPrimitive.TooltipProps<
  ChartValue,
  ChartName
>;
type TooltipPayloadEntry = any;
type TooltipPayload = any;
type TooltipFormatter = any;
type TooltipLabelFormatter = any;

type RechartsLegendPayload = any;
type RechartsLegendPayloadEntry = RechartsLegendPayload[number];

export type ChartConfig = Record<
  string,
  {
    label?: React.ReactNode;
    icon?: React.ComponentType<{ className?: string }>;
  } & (
    | {
        color: string;
        theme?: never;
      }
    | {
        color?: never;
        theme: Record<ThemeName, string>;
      }
  )
>;

type ChartContextValue = {
  config: ChartConfig;
  chartId: string;
};

const ChartContext = React.createContext<ChartContextValue | null>(null);

function useChart() {
  const context = React.useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

export interface ChartContainerProps extends React.ComponentProps<"div"> {
  config: ChartConfig;
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"];
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: ChartContainerProps) {
  const reactId = React.useId();
  const chartId = React.useMemo(
    () => `chart-${id ?? reactId.replace(/:/g, "")}`,
    [id, reactId],
  );

  return (
    <ChartContext.Provider value={{ config, chartId }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs",
          "[&_.recharts-cartesian-axis-tick_text]:fill-[var(--color-text-muted)]",
          "[&_.recharts-cartesian-grid_line]:stroke-[color:var(--color-border)]/60",
          "[&_.recharts-curve.recharts-tooltip-cursor]:stroke-[var(--color-border)]",
          "[&_.recharts-polar-grid_*]:stroke-[color:var(--color-border)]/60",
          "[&_.recharts-radial-bar-background-sector]:fill-[var(--color-surface-3)]",
          "[&_.recharts-rectangle.recharts-tooltip-cursor]:fill-[var(--color-surface-3)]",
          "[&_.recharts-reference-line_line]:stroke-[var(--color-border)]",
          "[&_.recharts-dot[stroke='#fff']]:stroke-transparent",
          "[&_.recharts-layer]:outline-none",
          "[&_.recharts-sector]:outline-none",
          "[&_.recharts-surface]:outline-none",
          className,
        )}
        {...props}
      >
        <ChartStyle config={config} chartId={chartId} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

interface ChartStyleProps {
  chartId: string;
  config: ChartConfig;
}

function ChartStyle({ chartId, config }: ChartStyleProps) {
  const entries = React.useMemo(
    () =>
      Object.entries(config).filter(([, item]) => {
        return Boolean(item.color || item.theme);
      }),
    [config],
  );

  const cssText = React.useMemo(() => {
    if (!entries.length) return "";

    return Object.entries(THEMES)
      .map(([theme, selector]) => {
        const vars = entries
          .map(([key, item]) => {
            const color =
              "theme" in item ? item.theme?.[theme as ThemeName] : item.color;

            return color ? `  --color-${key}: ${color};` : null;
          })
          .filter(Boolean)
          .join("\n");

        return `${selector} [data-chart="${chartId}"] {\n${vars}\n}`;
      })
      .join("\n");
  }, [chartId, entries]);

  if (!cssText) return null;

  return <style>{cssText}</style>;
}

const ChartTooltip = RechartsPrimitive.Tooltip;
const ChartLegend = RechartsPrimitive.Legend;

type IndicatorType = "dot" | "line" | "dashed";

export interface ChartTooltipContentProps extends React.ComponentProps<"div"> {
  active?: RechartsTooltipProps["active"];
  payload?: TooltipPayload;
  label?: string | number;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: IndicatorType;
  nameKey?: string;
  labelKey?: string;
  labelFormatter?: TooltipLabelFormatter;
  formatter?: TooltipFormatter;
  labelClassName?: string;
  color?: string;
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}: ChartTooltipContentProps) {
  const { config } = useChart();

  const typedPayload = (payload ?? []) as TooltipPayload;

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !typedPayload.length) return null;

    const firstItem = typedPayload[0];
    const configKey = String(
      labelKey ?? firstItem?.dataKey ?? firstItem?.name ?? "value",
    );

    const itemConfig = getPayloadConfig(config, firstItem, configKey);

    const resolvedLabel =
      !labelKey && typeof label === "string"
        ? (config[label]?.label ?? label)
        : (itemConfig?.label ?? label);

    if (!resolvedLabel) return null;

    if (labelFormatter) {
      return (
        <div className={cn("font-medium", labelClassName)}>
          {labelFormatter(resolvedLabel, typedPayload)}
        </div>
      );
    }

    return (
      <div className={cn("font-medium", labelClassName)}>{resolvedLabel}</div>
    );
  }, [
    config,
    hideLabel,
    label,
    labelClassName,
    labelFormatter,
    labelKey,
    typedPayload,
  ]);

  if (!active || !typedPayload.length) {
    return null;
  }

  const nestLabel = typedPayload.length === 1 && indicator !== "dot";

  return (
    <div
      className={cn(
        "grid min-w-[10rem] items-start gap-1.5 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-xs shadow-[var(--shadow-lg)]",
        className,
      )}
    >
      {!nestLabel ? tooltipLabel : null}

      <div className="grid gap-1.5">
        {typedPayload.map(
          (
            item: {
              name: any;
              dataKey: any;
              payload: Record<string, unknown>;
              color: any;
              value:
                | {
                    toLocaleString: () =>
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<
                          unknown,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactPortal
                          | React.ReactElement<
                              unknown,
                              string | React.JSXElementConstructor<any>
                            >
                          | Iterable<React.ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }
                | null
                | undefined;
            },
            index: any,
          ) => {
            const configKey = String(
              nameKey ?? item.name ?? item.dataKey ?? "value",
            );

            const itemConfig = getPayloadConfig(config, item, configKey);

            const itemPayload =
              item.payload && typeof item.payload === "object"
                ? (item.payload as Record<string, unknown>)
                : undefined;

            const indicatorColor =
              color ??
              (typeof itemPayload?.fill === "string"
                ? itemPayload.fill
                : undefined) ??
              item.color ??
              `var(--color-${configKey})`;

            return (
              <div
                key={`${item.dataKey ?? item.name ?? index}`}
                className={cn(
                  "flex w-full flex-wrap items-stretch gap-2",
                  indicator === "dot" && "items-center",
                )}
              >
                {formatter && item.value !== undefined ? (
                  formatter(item.value, item.name, item, index, typedPayload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            "shrink-0 rounded-[2px]",
                            indicator === "dot" && "h-2.5 w-2.5",
                            indicator === "line" && "h-6 w-1 rounded-full",
                            indicator === "dashed" &&
                              "mt-1 h-0 w-3 rounded-none border-t-2 border-dashed bg-transparent",
                          )}
                          style={{
                            backgroundColor:
                              indicator === "dashed"
                                ? "transparent"
                                : indicatorColor,
                            borderColor:
                              indicator === "dashed"
                                ? String(indicatorColor)
                                : undefined,
                          }}
                        />
                      )
                    )}

                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-[var(--color-text-muted)]">
                          {itemConfig?.label ?? item.name}
                        </span>
                      </div>

                      {item.value !== undefined && item.value !== null ? (
                        <span className="font-mono font-medium tabular-nums text-[var(--color-text)]">
                          {typeof item.value === "number"
                            ? item.value.toLocaleString()
                            : String(item.value)}
                        </span>
                      ) : null}
                    </div>
                  </>
                )}
              </div>
            );
          },
        )}
      </div>
    </div>
  );
}

export interface ChartLegendContentProps
  extends
    RechartsPrimitive.LegendProps,
    Omit<React.ComponentProps<"div">, keyof RechartsPrimitive.LegendProps> {
  hideIcon?: boolean;
  nameKey?: string;
  payload?: any;
}

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = "bottom",
  nameKey,
}: ChartLegendContentProps) {
  const { config } = useChart();

  const typedPayload = (payload ?? []) as RechartsLegendPayload;

  if (!typedPayload.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className,
      )}
    >
      {typedPayload.map(
        (item: { dataKey: any; value: any; color: any }, index: any) => {
          const configKey = String(
            nameKey ?? item.dataKey ?? item.value ?? index,
          );
          const itemConfig = getPayloadConfigFromLegend(
            config,
            item,
            configKey,
          );

          return (
            <div
              key={`${item.value ?? item.dataKey ?? index}`}
              className="flex items-center gap-1.5"
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon className="h-3 w-3 text-[var(--color-text-muted)]" />
              ) : (
                <div
                  className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color ?? `var(--color-${configKey})`,
                  }}
                />
              )}

              <span className="text-xs text-[var(--color-text-muted)]">
                {itemConfig?.label ?? item.value}
              </span>
            </div>
          );
        },
      )}
    </div>
  );
}

function getPayloadConfig(
  config: ChartConfig,
  payload: TooltipPayloadEntry,
  fallbackKey: string,
) {
  const rawPayload =
    payload && typeof payload.payload === "object" && payload.payload !== null
      ? (payload.payload as Record<string, unknown>)
      : undefined;

  const directValue =
    typeof (payload as Record<string, unknown>)[fallbackKey] === "string"
      ? ((payload as Record<string, unknown>)[fallbackKey] as string)
      : undefined;

  const nestedValue =
    rawPayload && typeof rawPayload[fallbackKey] === "string"
      ? (rawPayload[fallbackKey] as string)
      : undefined;

  const resolvedKey = directValue ?? nestedValue ?? fallbackKey;

  return config[resolvedKey] ?? config[fallbackKey];
}

function getPayloadConfigFromLegend(
  config: ChartConfig,
  payload: RechartsLegendPayloadEntry,
  fallbackKey: string,
) {
  const resolvedKey =
    typeof payload.dataKey === "string"
      ? payload.dataKey
      : typeof payload.value === "string"
        ? payload.value
        : fallbackKey;

  return config[resolvedKey] ?? config[fallbackKey];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
