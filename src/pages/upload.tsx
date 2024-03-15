import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/navbar";
import UploadExcelPage from "../components/excel";

export default function Upload() {

    return (
        <div>
            <Navbar />
            <div>
                <UploadExcelPage />
            </div>
        </div>
    )

}