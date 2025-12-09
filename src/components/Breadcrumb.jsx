import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="px-6 pt-6 sm:ml-24 sm:mt-8 mt-6 -mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center text-sm text-gray-600 space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              {/* Show separator after each item except the first */}
              {index > 0 && (
                <li className="text-gray-900 font-semibold">/</li>
              )}

              <li className="inline-flex items-center">
                {isLast ? (
                  // Last item - no link, styled as current page
                  <span className="text-primary font-semibold" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  // Other items - clickable links
                  <Link 
                    to={item.path} 
                    className="hover:text-secondary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
