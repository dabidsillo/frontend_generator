import StudioEditor from "@grapesjs/studio-sdk/react";

import "@grapesjs/studio-sdk/style";

export default function Design() {
  return (
    <div className="h-screen">
      <StudioEditor
        options={{
          licenseKey: "DEMO_LOCALHOST_KEY",
          project: {
            type: "web",
          },
          assets: {
            storageType: "self",
            // Provide a custom upload handler for assets
            onUpload: async ({ files }) => {
              const body = new FormData();
              for (const file of files) {
                body.append("files", file);
              }
              const response = await fetch("ASSETS_UPLOAD_URL", {
                method: "POST",
                body,
              });
              const result = await response.json();
              // The expected result should be an array of assets, eg.
              // [{ src: 'ASSET_URL' }]
              return result;
            },
            // Provide a custom handler for deleting assets
            onDelete: async ({ assets }) => {
              const body = JSON.stringify(assets);
              await fetch("ASSETS_DELETE_URL", { method: "DELETE", body });
            },
          },
          storage: {
            type: "self",
            // Provide a custom handler for saving the project data.
            onSave: async ({ project }) => {
              throw new Error('Implement your "onSave"!');
              const body = new FormData();
              body.append("project", JSON.stringify(project));
              await fetch("PROJECT_SAVE_URL", { method: "POST", body });
            },
            // Provide a custom handler for loading project data.
            onLoad: async () => {
              throw new Error('Implement your "onLoad"!');
              const response = await fetch("PROJECT_LOAD_URL");
              const project = await response.json();
              // The project JSON is expected to be returned inside an object.
              return { project };
            },
            autosaveChanges: 100,
            autosaveIntervalMs: 10000,
          },
        }}
      />
    </div>
  );
}
