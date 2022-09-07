import React from "react";

function ResultsList(props: any) {
  const { options, onClick } = props;
    
  return (
    <ul>
      {options.map((option: any, index: number) => {
        return (
          <div onClick={() => onClick(option)} key={index}>
            {option.name}
          </div>
        );
      })}
    </ul>
  );
}

export default ResultsList;
