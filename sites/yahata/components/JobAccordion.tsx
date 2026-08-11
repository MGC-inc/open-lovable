"use client";

import { useState } from "react";

import type { JobPosting } from "@/data/recruit";

/** 募集要項 accordion. Only the panel visibility was ever scripted. */
export default function JobAccordion({ jobs }: { jobs: JobPosting[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      {jobs.map((job) => {
        const open = openId === job.id;
        return (
          <dl className="p-panel_requirement" key={job.id}>
            <dt className="p-panel_requirement__head">
              <div className="c-inner">
                <div
                  className={`p-panel_requirement__title js-accordion${open ? " is-act" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={open}
                  aria-controls={job.id}
                  onClick={() => setOpenId(open ? null : job.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setOpenId(open ? null : job.id);
                    }
                  }}
                >
                  <h3 className="p-panel_requirement__name">{job.name}</h3>
                  <div className="p-panel_requirement__count">{job.count}</div>
                  <div className="p-panel_requirement__toggle" />
                </div>
              </div>
            </dt>
            <dd
              className={`p-panel_requirement__body${open ? " is-open" : ""}`}
              id={job.id}
              dangerouslySetInnerHTML={{ __html: job.content }}
            />
          </dl>
        );
      })}
    </>
  );
}
