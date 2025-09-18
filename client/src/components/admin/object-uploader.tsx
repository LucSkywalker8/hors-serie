import { useState } from "react";
import Uppy from "@uppy/core";
import { DashboardModal } from "@uppy/react";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ObjectUploaderProps {
  onComplete?: (urls: string[]) => void;
  maxFiles?: number;
  acceptedFileTypes?: string[];
}

export function ObjectUploader({ 
  onComplete, 
  maxFiles = 10, 
  acceptedFileTypes = ['.jpg', '.jpeg', '.png', '.webp'] 
}: ObjectUploaderProps) {
  const [showModal, setShowModal] = useState(false);
  const [uppy] = useState(() =>
    new Uppy({
      restrictions: {
        maxNumberOfFiles: maxFiles,
        maxFileSize: 10485760, // 10MB
        allowedFileTypes: acceptedFileTypes,
      },
      autoProceed: false,
    })
  );

  const uploadMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/admin/upload-url");
      const data = await response.json();
      return data.uploadURL;
    },
  });

  const handleUpload = async () => {
    try {
      const files = uppy.getFiles();
      const uploadedUrls: string[] = [];

      for (const file of files) {
        const uploadURL = await uploadMutation.mutateAsync();
        
        // Upload file to the signed URL
        const uploadResponse = await fetch(uploadURL, {
          method: 'PUT',
          body: file.data,
          headers: {
            'Content-Type': file.type || 'application/octet-stream',
          },
        });

        if (uploadResponse.ok) {
          // Extract the object path from the upload URL
          const urlParts = uploadURL.split('?')[0]; // Remove query parameters
          const objectPath = urlParts.replace('https://storage.googleapis.com', '/objects');
          uploadedUrls.push(objectPath);
        }
      }

      if (uploadedUrls.length > 0 && onComplete) {
        onComplete(uploadedUrls);
      }

      uppy.cancelAll();
      setShowModal(false);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  // Configure uppy to handle manual upload
  uppy.on('upload', () => {
    handleUpload();
  });

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => setShowModal(true)}
        className="border-chartreuse text-black bg-chartreuse hover:bg-chartreuse/90"
      >
        <Upload className="h-4 w-4 mr-2" />
        Télécharger des images
      </Button>

      <DashboardModal
        uppy={uppy}
        open={showModal}
        onRequestClose={() => setShowModal(false)}
        proudlyDisplayPoweredByUppy={false}
        locale={{
          strings: {
            dropPasteFiles: 'Glissez-déposez des fichiers ici ou %{browseFiles}',
            browseFiles: 'parcourez',
            uploadComplete: 'Téléchargement terminé',
            uploadPaused: 'Téléchargement en pause',
            resumeUpload: 'Reprendre le téléchargement',
            pauseUpload: 'Mettre en pause',
            retryUpload: 'Réessayer',
            cancelUpload: 'Annuler',
            xFilesSelected: {
              0: '%{smart_count} fichier sélectionné',
              1: '%{smart_count} fichiers sélectionnés',
            },
            uploadingXFiles: {
              0: 'Téléchargement de %{smart_count} fichier',
              1: 'Téléchargement de %{smart_count} fichiers',
            },
            processingXFiles: {
              0: 'Traitement de %{smart_count} fichier',
              1: 'Traitement de %{smart_count} fichiers',
            },
          },
        }}
      />
    </>
  );
}