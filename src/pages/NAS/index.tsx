import { useState } from 'react';

import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Image } from 'primereact/image';
import { Panel } from 'primereact/panel';
import { NasFile } from 'utilities/Interface/NetworkInterface';

import Upload from './component/Upload';

const NAS: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<NasFile | null>(null);
  const [fileList, setFileList] = useState<NasFile[]>([]);

  const updateFileList = (files: NasFile[]) => {
    setFileList(files);
  };

  return (
    <div className='card'>
      <h3>NAS.UV</h3>

      <div className='grid'>
        <div className='col-12 md:col-4'>
          <Upload onUpdateFileList={updateFileList} />
        </div>

        <div className='col-12 md:col-8'>
          <Dropdown
            className='w-full mb-3' 
            id='fileDropdown'
            value={selectedFile}
            options={fileList}
            onChange={(e) => setSelectedFile(e.value)}
            optionLabel='file_name'
            placeholder='Select a file'
            aria-label='File Selection Dropdown'
            showClear={true}
          />
          <Panel header='Viewer'>
            <div className='h-20rem flex flex-column justify-content-center'>
              {selectedFile ? (
                <div className='flex flex-column h-full'>
                  {selectedFile.file_path.endsWith('.pdf') ? (
                    <>
                      <div className='flex justify-content-start mb-2'>
                        <Button
                          type='button'
                          onClick={() =>
                            window.open(selectedFile.file_path, '_blank', 'noopener,noreferrer')
                          }
                          severity='secondary'
                          label='Expand'
                        />
                      </div>
                      <div className='flex justify-content-center align-items-center'>
                        <embed
                          src={selectedFile.file_path}
                          width='100%'
                          height='210px'
                          type='application/pdf'
                          style={{
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                          }}
                        />
                      </div>
                    </>
                  ) : selectedFile.file_path.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                    <div className='flex justify-content-center align-items-center'>
                      <Image
                        src={selectedFile.file_path}
                        alt='Selected File'
                        width='100%'
                        height='255px'
                        style={{ border: '1px solid #ccc', borderRadius: '5px' }}
                        preview
                      />
                    </div>
                  ) : (
                    <>
                      <div className='flex justify-content-start mb-2'>
                        <Button
                          type='button'
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = selectedFile.file_path;
                            link.download = selectedFile.file_name;
                            link.click();
                          }}
                          severity='success'
                          label='Download'
                        />
                      </div>
                      <div className='flex flex-column justify-content-center align-items-center'>
                        <p className='p-text-center'>
                          {selectedFile.file_name} cannot be viewed in the browser.
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className='flex justify-content-center align-items-center'>
                  <p className='p-text-center'>No file selected.</p>
                </div>
              )}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
};

export default NAS;
