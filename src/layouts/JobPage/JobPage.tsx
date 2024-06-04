import { useState } from "react";
import { Footer } from "../HeaderAndFooter/Footer";
import { HeaderSmaller } from "../HeaderAndFooter/HeaderSmaller";
import { SearchButton } from "../HeaderAndFooter/button/search";
import { JobList } from "./JobList";

export const JobpPage = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <>
      <div className="d-flex flex-column">
        <HeaderSmaller />
        <div>
          <JobList search={search} />
        </div>
        <Footer />
      </div>
    </>
  );
};
