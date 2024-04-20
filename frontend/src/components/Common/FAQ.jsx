import React, { useEffect, useState } from "react";
import { faqData } from "../../data";
import { AccordionContent, AccordionTitle, FaqAccordion } from "./FaqAccordion";
import { DisableAccount } from "..";
import { Modal } from "../UIComponents";

export const FAQ = () => {
  const data = faqData();

  const [openDisable, setopenDisable] = useState(false);

  return (
    <section className="flex flex-col">
      {data?.map((item, idx) => (
        <FaqAccordion className="p-3 " key={idx}>
          <AccordionTitle>{item?.title}</AccordionTitle>
          <AccordionContent>{item?.content}</AccordionContent>
        </FaqAccordion>
      ))}
      <FaqAccordion className="p-3 ">
        <AccordionTitle>How to delete my account?</AccordionTitle>

        <AccordionContent>
          Your account will be temporarily disabled.You can reactivate within 30
          days to avoid permanent deletion. You can reactivate by logging in
          using your credentials.

          <Modal open={openDisable} setOpen={setopenDisable}>
            <DisableAccount handleOpen={setopenDisable} />
          </Modal>
          <button className={` text-red-600   border-red-600 border rounded px-2 my-2  py-1 text-sm pb-[0.3rem] hover:bg-red-600
           hover:text-white duration-300`} onClick={()=>{setopenDisable(true);setsettingOpen(false)}}>Temporarily disable account</button>

        </AccordionContent>
        
      </FaqAccordion>
    </section>
  );
};
