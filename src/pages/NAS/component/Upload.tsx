import { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { NasFile, NasFolder } from "utilities/Interface/NetworkInterface";
import SynologyService from "services/synology.service";
import {
  showSuccess,
  showError,
  showWarning,
} from "utilities/Function/toast.function";
import { LoadingProvider, useLoading } from "context/LoadingContext";
import { callApi } from "utilities/Function/callApi.function";

interface UploadProps {
  onUpdateFileList: (files: NasFile[]) => void;
}

const Upload: React.FC<UploadProps> = ({ onUpdateFileList }) => {
  const fileUploadRef = useRef<FileUpload>(null);
  const toastRef = useRef<Toast>(null);
  const { startLoading, stopLoading } = useLoading();
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedFolder, setSelectedFolder] = useState<NasFolder | null>(null);
  const [folderList, setFolderList] = useState<NasFolder[]>([]);
  const [uploadList, setUploadList] = useState<File[]>([]);
  const [newFolder, setNewFolder] = useState<string>("");

  const synologyService = new SynologyService();

  let apiFunc;
  let data;

  const fetchList = async (path: string) => {
    const res = await synologyService.getFileList(path);
    if (res.status) {
      onUpdateFileList(res.data);
    }
  };

  useEffect(() => {
    if (selectedFolder) {
      fetchList(selectedFolder?.folder_path);
    }
  }, [selectedFolder]);

  const fetchFolder = async () => {
    apiFunc = synologyService.getFolderList;
    callApi({ apiFunc, setLoading }, data).then((res: any) => {
      if (res.status) {
        setFolderList(res.data);
      }
    });
  };

  useEffect(() => {
    fetchFolder();
  }, []);

  const addFolder = async (folder: string) => {
    apiFunc = synologyService.createFolder;
    data = folder;
    callApi({ apiFunc, setLoading }, data).then((res: any) => {
      if (res.status) {
        showSuccess(toastRef, res.message);
        fetchFolder();
      } else {
        showError(toastRef, "Folder exists");
      }
      setNewFolder("");
    });
  };

  const handleFileSelect = (event: any) => {
    setUploadList([...event.files]);
  };

  const handleSubmit = async (event: any) => {
    const formData = new FormData();

    if (uploadList && uploadList.length > 0 && selectedFolder) {
      uploadList.forEach((file) => {
        formData.append("files", file);
      });

      const networkPath = selectedFolder.folder_path;
      formData.append("networkPath", networkPath);
      startLoading();
      setLoading(true);
      try {
        let res;
        if (activeIndex === 0) {
          res = await synologyService.upload(formData);
        }

        if (res && res.status) {
          showSuccess(toastRef, "File upload success");
          fetchList(selectedFolder?.folder_path);
        } else {
          showError(toastRef, "File upload fail");
        }

        setUploadList([]);
        fileUploadRef.current?.clear();
      } catch (error) {
        showError(toastRef, "Upload error");
      }
      stopLoading();
      setLoading(false);
    } else {
      showWarning(toastRef, "No path selected");
    }
  };

  const handleClear = async () => {
    setUploadList([]);
    fileUploadRef.current?.clear();
  };

  return (
    <LoadingProvider>
      <div>
        <Toast ref={toastRef} />
        <div>
          <div>
            <div className="grid align-items-center">
              <div className="col-12">
                <Dropdown
                  className="w-full"
                  id="fileDropdown"
                  value={selectedFolder}
                  options={folderList}
                  onChange={(e) => setSelectedFolder(e.value)}
                  optionLabel="folder_name"
                  placeholder="Select a folder"
                  showClear
                />
              </div>
              <div className="col-12">
                <div className="flex gap-2 w-full">
                  <InputText
                    value={newFolder}
                    onChange={(e) => setNewFolder(e.target.value)}
                    placeholder="Enter folder name"
                    className="w-full"
                  />
                  <Button
                    label="Create Folder"
                    onClick={() => addFolder(newFolder)}
                    disabled={loading || newFolder.trim() === ""}
                    className="w-full"
                    severity="secondary"
                  />
                </div>
              </div>
              {uploadList.length > 0 && (
                <div className="col-12">
                  <div className="flex gap-2 w-full">
                    <Button
                      label="Upload"
                      icon="pi pi-upload"
                      className="p-button-success w-full"
                      onClick={handleSubmit}
                      disabled={loading || uploadList.length === 0}
                    />
                    <Button
                      label="Cancel"
                      icon="pi pi-times"
                      className="p-button-danger w-full"
                      onClick={handleClear}
                      disabled={loading || uploadList.length === 0}
                    />
                  </div>
                </div>
              )}
              <div className="col-12">
                <FileUpload
                  name="files"
                  ref={fileUploadRef}
                  accept={
                    activeIndex === 0 ? "image/*,application/pdf" : "video/*"
                  }
                  customUpload
                  multiple
                  uploadHandler={handleFileSelect}
                  maxFileSize={100 * 1024 * 1024}
                  auto={true}
                  chooseLabel="Add Files For Upload"
                  style={{ width: "100%" }}
                  disabled={loading}
                  onSelect={(event) => {
                    setUploadList((prevList) => [...prevList, ...event.files]);
                  }}
                  onRemove={(event) => {
                    setUploadList((prevList) =>
                      prevList.filter((file) => file.name !== event.file.name)
                    );
                  }}
                  emptyTemplate={
                    <p
                      className="p-8 p-text-center"
                      style={{ textAlign: "center" }}
                    >
                      Drop files here for upload.
                    </p>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingProvider>
  );
};

export default Upload;
