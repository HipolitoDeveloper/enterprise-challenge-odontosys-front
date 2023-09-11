import React from "react";

export interface IRoute {
    slug: string;
    component: React.ReactNode
    group: 'DOC' | 'PAT' | 'CLI'| 'APP'| 'MED'| 'EXA' | 'DAS' | 'OFF' | 'CON' | 'PROC'
}
