import React from "react";
import { CustomerSupport } from "./";
import { Bug, FAQ } from "../components";

export const HelpAndSupport = () => {
  return (
    <section className="w-full p-4 md:p-0">
      <div className="w-full md:w-3/4 lg:w-1/2  mx-auto">
        <FAQ />
      </div>
      <div className="w-full md:w-3/4 lg:w-1/2  mx-auto text-center py-16 ">
        <p className="text-3xl font-bold"> Still have questions?</p>
        <p>Contact us for further assistance.</p>
      </div>
      <div className="w-full md:w-3/4 lg:w-1/2   mx-auto">
        <CustomerSupport />
      </div>
      <Bug/>
    </section>
  );
};
