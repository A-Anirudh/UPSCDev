import React, { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { EachSubjectCardsContainer } from "../components";


export const ViewContainer = () => {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject");
  const currentAffair = searchParams.get("currentAffair");
  
  return (
    <section>
       
        <EachSubjectCardsContainer
          subject={subject}
          isCurrentAffair={currentAffair}
        />
      
    </section>
  );
};
