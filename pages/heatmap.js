// pages/heatmap.js
/*  
 * Name: Lau Jia Qi   
 * Student ID: S10267822A 
 * Implemented: Full development of the heatmap page.  
 */
import dynamic from "next/dynamic";

// Disable SSR for Heatmap
const Heatmap = dynamic(() => import("../components/Heatmap"), { ssr: false });

export default function HeatmapPage() {
    return (
        <div>
            <Heatmap />
        </div>
    );
}
