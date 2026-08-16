import { Fragment } from "react";
import type { Status } from "@/lib/data";
import { CheckIcon } from "./icons";

const steps: Status[] = ["Pending", "Ongoing", "Resolved"];

export default function StatusTimeline({ 
  status,
  direction = "horizontal"
}: { 
  status: Status;
  direction?: "horizontal" | "vertical";
}) {
  const activeIndex = steps.indexOf(status);
  const isVertical = direction === "vertical";

  return (
    <div className={`flex ${isVertical ? "flex-col gap-0" : "items-center"}`}>
      {steps.map((step, i) => {
        const done = i < activeIndex;
        const current = i === activeIndex;
        
        if (isVertical) {
          return (
            <div key={step} className="flex gap-4">
              <div className="flex flex-col items-center">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                    done
                      ? "border-surface-dark bg-surface-dark text-white"
                      : current
                        ? "border-surface-dark bg-surface-dark text-white ring-4 ring-surface-dark/10"
                        : "border-hairline bg-surface-card text-gray-300"
                  }`}
                >
                  {done ? (
                    <CheckIcon className="h-3.5 w-3.5" />
                  ) : (
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${current ? "bg-white" : "bg-gray-300"}`}
                    />
                  )}
                </span>
                {i < steps.length - 1 && (
                  <span
                    className={`my-1 w-px flex-1 ${
                      done ? "bg-surface-dark" : "bg-hairline"
                    }`}
                  />
                )}
              </div>
              <div className={`pb-8 pt-1.5 ${i === steps.length - 1 ? 'pb-2' : ''}`}>
                 <span
                  className={`text-sm font-bold uppercase tracking-wider ${
                    done || current ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
                <p className="mt-1 text-sm text-gray-500">
                  {step === "Pending" && "Complaint received and logged into the system."}
                  {step === "Ongoing" && "Team dispatched for site assessment."}
                  {step === "Resolved" && "Issue has been addressed and closed."}
                </p>
              </div>
            </div>
          );
        }

        return (
          <Fragment key={step}>
            <div className="flex flex-1 flex-col items-center">
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                  done
                    ? "border-surface-dark bg-surface-dark text-white"
                    : current
                      ? "border-surface-dark bg-surface-dark text-white ring-4 ring-surface-dark/10"
                      : "border-hairline bg-surface-card text-gray-300"
                }`}
              >
                {done ? (
                  <CheckIcon className="h-3.5 w-3.5" />
                ) : (
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${current ? "bg-white" : "bg-gray-300"}`}
                  />
                )}
              </span>
              <span
                className={`mt-2 text-xs font-semibold ${
                  done || current ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={`mb-6 h-px flex-1 ${
                  i < activeIndex ? "bg-surface-dark" : "bg-hairline"
                }`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}


