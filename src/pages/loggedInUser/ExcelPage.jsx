import React, { useState } from "react";
const ExcelDownloadComponent = () => {
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const handleDownload = async () => {
    // Create a new workbook
    // const workbook = await XlsxPopulate.fromBlankAsync();
    // // Add a worksheet
    // const sheet = workbook.sheet(0);
    // // Add headers
    // sheet.cell('A1').value('Dropdown Example');
    // sheet.cell('A2').value('Select Option');
    // sheet.cell('B2').dataValidation({
    //     type: 'list',
    //     formula1: `'${option1},${option2}'`,
    // });
    // // Add user selections
    // sheet.cell('B3').value(option1);
    // sheet.cell('B4').value(option2);
    // // Convert the workbook to a Blob
    // const blob = await workbook.outputAsync();
    // // Create a temporary link and trigger the download
    // const link = document.createElement('a');
    // link.href = URL.createObjectURL(new Blob([blob], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
    // link.download = 'dropdown_example.xlsx';
    // link.click();
  };
};
export default ExcelDownloadComponent;
