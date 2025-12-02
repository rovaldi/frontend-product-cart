import React from "react";
import { ProductDetailsProps } from "./types";
import { PRODUCT_DETAILS_TEXTS } from "./constants";

import "./ProductDetails.css";

const ProductDetails = ({ productDetails }: ProductDetailsProps) => {
  const {
    brand,
    colour,
    description,
    height,
    id,
    length,
    model_code,
    weight,
    width,
  } = productDetails;

  return (
    <>
      <section
        className="description"
        aria-describedby={`product ${id} description`}
      >
        <h1 id={`productDetails ${id} description`} className="subtitle">
          {PRODUCT_DETAILS_TEXTS.descriptionTitle}
        </h1>
        <p className="description__text">{description}</p>
      </section>
      <section aria-labelledby={`productDetails ${id} specifications`}>
        <h1 id={`productDetails ${id} specifications`} className="subtitle">
          {PRODUCT_DETAILS_TEXTS.specificationsTitle}
        </h1>
        <dl className="spec-list">
          <dt>{PRODUCT_DETAILS_TEXTS.brand}</dt>
          <dd>{brand || "N/A"}</dd>
          <dt>{PRODUCT_DETAILS_TEXTS.weight}</dt>
          <dd>{weight ? weight : "N/A"}</dd>
          <dt>{PRODUCT_DETAILS_TEXTS.dimensions}</dt>
          <dd>
            {length && width && height
              ? `${length} x ${width} x ${height}`
              : "N/A"}
          </dd>
          <dt>{PRODUCT_DETAILS_TEXTS.modelNumber}</dt>
          <dd>{model_code || "N/A"}</dd>
          <dt>{PRODUCT_DETAILS_TEXTS.colour}</dt>
          <dd>{colour || "N/A"}</dd>
        </dl>
      </section>
    </>
  );
};

export default React.memo(ProductDetails);
