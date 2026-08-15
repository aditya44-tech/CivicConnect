import { Fragment } from "react";
import type { Status } from "@/lib/data";
import { CheckIcon } from "./icons";

const steps: Status[] = ["Pending", "In Progress", "Resolved"];

export default function StatusTimeline({ status }: { status: Status }) {
  const activeIndex = steps.indexOf(status);

  return (
    <div className="flex items-center">
      {steps.map((step, i) => {
        const done = i < activeIndex;
        const current = i === activeIndex;
        return (
          <Fragment key={step}>
            <div className="flex flex-1 flex-col items-center">
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-colors ${
                  done
                    ? "border-green-500 bg-green-500 text-white"
                    : current
                      ? "border-primary bg-primary text-white shadow-md shadow-primary/30"
                      : "border-gray-200 bg-white text-gray-300"
                }`}
              >
                {done ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <span
                    className={`h-2 w-2 rounded-full ${current ? "bg-white" : "bg-gray-200"}`}
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
                className={`mb-6 h-0.5 flex-1 rounded-full ${
                  i < activeIndex ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
