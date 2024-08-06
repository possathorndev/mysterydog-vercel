import React from "react";

// Components
import VenueHeader from "@/components/Venues/Venue/VenueHeader";
import VenueList from "@/components/Venues/Venue/VenueList";

const VenuePage = () => {
    return (
        <div className='m-auto flex max-w-screen-fullhd flex-col items-center space-y-4 py-4'>
            {/* HEADER */}
            <VenueHeader/>

            {/* BLOG LIST */}
            <VenueList/>
        </div>
    )
}

export default VenuePage
