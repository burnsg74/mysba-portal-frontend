import React from "react";
import { render, screen } from "@testing-library/react";
import CertificationDetail from "./CertificationDetail";
import { Provider, useSelector } from "react-redux";
import { store } from "src/store/store";
import { BrowserRouter } from "react-router-dom";

jest.mock("react-redux", () => ({ ...jest.requireActual("react-redux"), useSelector: jest.fn() }));
const mockedUseSelector = useSelector as jest.Mock;

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), useParams: jest.fn().mockReturnValue({ id: 1 }),
}));

describe("Page: CertificationDetail", () => {

  it("It renders", () => {
    mockedUseSelector.mockImplementation(callback => callback({
      user: {
        businesses        : [{
          email                   : "cindy@example.com",
          owner                   : "Cindy Smith",
          id                      : 1,
          name                    : "Bloom Marketing Co.",
          legal_entity            : "Limited Liability Company",
          ownership_type          : "Women-Owned Small Business",
          uei                     : "123456789012",
          ein                     : "52-1992892",
          user_id                 : "P0019385",
          mailing_address_street  : "3324 Oakwood Avenue",
          mailing_address_city    : "San Jose",
          mailing_address_state   : "CA",
          mailing_address_zipcode : "95126",
          business_address_street : "600 Pine Street",
          business_address_city   : "Atlanta",
          business_address_state  : "GA",
          business_address_zipcode: "30304",
          business_phone_number   : "+1 408-555-1234",
          fax                     : "+1 408-555-4321",
          naics_codes             : "541810 (Advertising & Marketing)",
          capabilities_narrative  : "We specialize in crafting compelling advertising campaigns and strategic marketing solutions to drive brand awareness and engagement.",
          website                 : "www.BloomMarketingCo.com",
        }], certifications: [{
          certification_id  : 1,
          business_id       : 1,
          certification_type: "Women-Owned Small Business",
          days_until_expiry : 60,
          expiration_date   : "2022-01-01",
        }],
      },
    }));

    render(<Provider store={store}>
      <BrowserRouter>
        <CertificationDetail />
      </BrowserRouter>
    </Provider>);

    expect(screen.getByText("Women-Owned Small Business")).toBeDefined();
  });
});