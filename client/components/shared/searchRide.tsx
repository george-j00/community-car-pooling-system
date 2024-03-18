'use client'
import React from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const SearchRide = () => {
    const handleSearch = () => {
        console.log('search ride');
    };

    return (
        <div className="flex justify-center">
            <div className="bg-gray-500  text-black flex flex-col md:flex-row md:w-[80%] space-y-4 md:space-y-0 md:space-x-4 p-4 rounded-2xl">
                <div className="flex flex-row gap-5 items-center">
                    <Label htmlFor="source_location" className="text-right">
                        Pickup location
                    </Label>
                    <Input
                        id="source_location"
                        className="col-span-3 input-field w-[210px] ml-8 md:ml-[15px] bg-white"
                        type="text"
                        placeholder='Pick up location'
                    />
                </div>
                <div className="flex flex-row gap-5 items-center">
                    <Label htmlFor="destination_location" className="text-right ">
                        Drop-off location
                    </Label>
                    <Input
                        id="destination_location"
                        className="col-span-3 input-field w-[210px] ml-5 md:ml-1"
                        type="text"
                        placeholder='Drop-off location'
                    />
                </div>
                <div className="flex flex-row gap-5 items-center">
                    <Label htmlFor="rideDate" className="text-right">
                        Pickup Date
                    </Label>
                    <Input
                        id="rideDate"
                        className="col-span-3 w-[210px] ml-auto input-field"
                        type="date"
                    />
                </div>
                <div className="flex justify-center">
                    <Button onClick={handleSearch}>
                        Search rides
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SearchRide;
