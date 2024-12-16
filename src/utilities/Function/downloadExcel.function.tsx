export const downloadExcel = async (link: string, fileName: string) => {
  try {
    const response = await fetch(link);
    console.log(response);
    if (!response.ok) {
      throw new Error("Network Error");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw new Error(error);
  }
};
