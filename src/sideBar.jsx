const sideBar = ({
  view,
  exapndAll,
  zoomData,
  setSourcesShown,
  sourcesShown,
  setTypesShown,
  typesShown,
  lengthCalc,
  dataView,
}) => {
  return (
    <div className="sidebar">
      <h1> Aggregate data</h1>
      <div id="1">
        <button
          onClick={() => {
            exapndAll(true);
          }}
        >
          Expand All
        </button>
        <button
          onClick={() => {
            exapndAll(false);
          }}
        >
          Collapse All
        </button>
        {/* {zoomData} */}
        {view === "month" ? (
          <>
            <h2>Month View</h2>
            {Object.entries(zoomData).map(([source, value]) => (
              <>
                <p>
                  <button
                    onClick={() => {
                      setSourcesShown({
                        ...sourcesShown,
                        [source]: !sourcesShown[source],
                      });
                    }}
                  >
                    {sourcesShown[source] ? <>▾</> : <>▸</>}
                  </button>
                  {source} - {lengthCalc(source)}
                </p>
                {sourcesShown[source] ? (
                  <>
                    {Object.entries(zoomData[source]).map(([type, value]) => (
                      <>
                        <div style={{ marginLeft: "5%" }}>
                          <p>
                            <button
                              onClick={() => {
                                setTypesShown({
                                  ...typesShown,
                                  [source]: {
                                    ...typesShown[source],
                                    [type]: !typesShown[source][type],
                                  },
                                });
                              }}
                            >
                              {typesShown[source][type] ? <>▾</> : <>▸</>}
                            </button>
                            {type} - {zoomData[source][type]["length"]}
                          </p>
                          {typesShown[source][type] ? (
                            dataView(
                              source,
                              type,
                              zoomData[source][type]["aggregate"]
                            )
                          ) : (
                            <></>
                          )}
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </>
            ))}
          </>
        ) : (
          <></>
        )}
        {view === "week" ? (
          <>
            <h2>Week View</h2>
            {Object.entries(zoomData).map(([source, value]) => (
              <>
                <p>
                  <button
                    onClick={() => {
                      setSourcesShown({
                        ...sourcesShown,
                        [source]: !sourcesShown[source],
                      });
                    }}
                  >
                    {sourcesShown[source] ? <>▾</> : <>▸</>}
                  </button>
                  {source} - {lengthCalc(source)}
                </p>
                {sourcesShown[source] ? (
                  <>
                    {Object.entries(zoomData[source]).map(([type, value]) => (
                      <>
                        <div style={{ marginLeft: "5%" }}>
                          <p>
                            <button
                              onClick={() => {
                                setTypesShown({
                                  ...typesShown,
                                  [source]: {
                                    ...typesShown[source],
                                    [type]: !typesShown[source][type],
                                  },
                                });
                              }}
                            >
                              {typesShown[source][type] ? <>▾</> : <>▸</>}
                            </button>
                            {type} - {zoomData[source][type]["length"]}
                          </p>
                          {typesShown[source][type] ? (
                            dataView(
                              source,
                              type,
                              zoomData[source][type]["aggregate"]
                            )
                          ) : (
                            <></>
                          )}
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </>
            ))}
          </>
        ) : (
          <></>
        )}
        {view === "year" ? (
          <>
            <h2>Year View</h2>
            {Object.entries(zoomData).map(([source, value]) => (
              <>
                <p>
                  <button
                    onClick={() => {
                      setSourcesShown({
                        ...sourcesShown,
                        [source]: !sourcesShown[source],
                      });
                    }}
                  >
                    {sourcesShown[source] ? <>▾</> : <>▸</>}
                  </button>
                  {source} - {lengthCalc(source)}
                </p>
                {sourcesShown[source] ? (
                  <>
                    {Object.entries(zoomData[source]).map(([type, value]) => (
                      <>
                        <div style={{ marginLeft: "5%" }}>
                          <p>
                            <button
                              onClick={() => {
                                setTypesShown({
                                  ...typesShown,
                                  [source]: {
                                    ...typesShown[source],
                                    [type]: !typesShown[source][type],
                                  },
                                });
                              }}
                            >
                              {typesShown[source][type] ? <>▾</> : <>▸</>}
                            </button>
                            {type} - {zoomData[source][type]["length"]}
                          </p>
                          {typesShown[source][type] ? (
                            dataView(
                              source,
                              type,
                              zoomData[source][type]["aggregate"]
                            )
                          ) : (
                            <></>
                          )}
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  <></>
                )}
              </>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
export default sideBar;
