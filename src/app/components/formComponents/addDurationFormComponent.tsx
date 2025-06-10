import { TimePicker } from "antd";
import dayjs from "dayjs";
import type { Restrictions } from "~/types/domain";
import { FormItemConfig } from "~/types/form";

/**
 * Duration form component props
 */
interface DurationFormComponentProps {
  restrictions: Restrictions;
  formItem: FormItemConfig;
}

/**
 * Format a duration in minutes to a dayjs object
 * @param duration - The duration in minutes
 * @returns The formatted duration
 */
export function formatDuration(duration: number) {
  return dayjs().hour(Math.floor(duration / 60)).minute(duration % 60);
}

/**
 * Duration form component
 */
export default function addDurationFormComponent({ restrictions, formItem }: DurationFormComponentProps) {
  // Ensure minimum duration is at least 1 minute
  const minDuration = Math.max(restrictions.min || 0, 1);
  const maxDuration = restrictions.max;

  // Add duration form component to the form item
  formItem.component = (
    <TimePicker
      format="HH:mm"
      autoSave="true"
      minuteStep={1}
      showSecond={false}
      showNow={false}
      changeOnScroll
      needConfirm={false}
      disabledTime={() => {
        return {
          // Disable hours that would exceed the maximum duration
          disabledHours: () =>
            Array.from({ length: 24 }, (_, i) => i).filter(
              (h) => h * 60 > maxDuration,
            ),
          // Disable minutes that would exceed the maximum duration
          disabledMinutes: (selectedHour) => {
            if (selectedHour * 60 >= maxDuration) {
              return Array.from({ length: 60 }, (_, i) => i);
            }
            if ((selectedHour + 1) * 60 > maxDuration) {
              return Array.from({ length: 60 }, (_, i) => i).filter(
                (m) => selectedHour * 60 + m > maxDuration,
              );
            }
            return [];
          },
        };
      }}
    />
  );

  // Add duration-specific validation
  formItem.rules.push(
    {
      validator: (_: unknown, value: dayjs.Dayjs | null | undefined) => {
        if (value) {
          const totalMinutes = value.hour() * 60 + value.minute();
          
          // Check minimum duration (at least 1 minute)
          if (totalMinutes < minDuration) {
            return Promise.reject(
              new Error(
                `A duração mínima é de ${formatDuration(minDuration).format('HH:mm')}!`,
              ),
            );
          }
          
          // Check maximum duration if defined
          if (maxDuration !== undefined && totalMinutes > maxDuration) {
            return Promise.reject(
              new Error(
                `A duração máxima é de ${formatDuration(maxDuration).format('HH:mm')}!`,
              ),
            );
          }
        }
        return Promise.resolve();
      },
    },
  );
}