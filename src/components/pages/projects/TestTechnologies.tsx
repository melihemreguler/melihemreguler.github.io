import { useTranslation } from "react-i18next";

export function TestTechnologies() {
    const { t } = useTranslation();
    const projects = t("home.projects.items", { returnObjects: true }) as any[];
    
    const firstProject = projects[0];
    
    return (
        <div className="p-4 border-2 border-red-500">
            <h2 className="text-lg font-bold mb-4">Technology Test Component</h2>
            
            <div className="mb-4">
                <h3 className="font-semibold">Raw data:</h3>
                <pre className="text-xs">{JSON.stringify(firstProject, null, 2)}</pre>
            </div>
            
            <div className="mb-4">
                <h3 className="font-semibold">Technologies array:</h3>
                <p>Type: {typeof firstProject?.technologies}</p>
                <p>Is Array: {Array.isArray(firstProject?.technologies) ? 'Yes' : 'No'}</p>
                <p>Length: {firstProject?.technologies?.length}</p>
                <p>Content: {JSON.stringify(firstProject?.technologies)}</p>
            </div>
            
            <div className="mb-4">
                <h3 className="font-semibold">Manual render:</h3>
                {firstProject?.technologies && firstProject.technologies.map((tech: string, index: number) => (
                    <span 
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2 mb-2 text-sm"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}
