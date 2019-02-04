import React from 'react';
import { FiSettings, FiPause, FiRefreshCcw, FiPlay } from "react-icons/fi";
import { IconContext } from "react-icons";

export const Settings = () => {
    return (
        <div>
            <IconContext.Provider value={{ size: "1.5em"}}>
                <div>
                <FiSettings/>
                </div>
            </IconContext.Provider>
        </div>
    );
  };

  export const Pause = () => {
    return (
        <div>
            <IconContext.Provider value={{ size: "1.5em"}}>
                <div>
                <FiPause/>
                </div>
            </IconContext.Provider>
        </div>
    );
  };
  export const Reset = () => {
    return (
        <div>
            <IconContext.Provider value={{ size: "1.5em"}}>
                <div>
                <FiRefreshCcw/>
                </div>
            </IconContext.Provider>
        </div>
    );
  };

  export const Play = () => {
    return (
        <div>
            <IconContext.Provider value={{ size: "1.5em"}}>
                <div>
                <FiPlay/>
                </div>
            </IconContext.Provider>
        </div>
    );
  };