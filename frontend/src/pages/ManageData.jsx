"use client";

import React, { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { data } from "@/assets/data.js";

const locationTypes = [
  "Restaurant",
  "Beach",
  "Hotel",
  "Tourist Attraction",
  "Park",
];

export default function DataManagementDashboard() {
  const [showDialog, setShowDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [allData, setAllData] = useState(data);

  const handleCreate = () => {
    setCurrentItem({
      locationName: "",
      locationType: "",
      address: "",
      description: "",
      openTime: "",
      closeTime: "",
      coordinates: { lat: 0, lng: 0 },
      reviews: [],
    });
    setShowDialog(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setShowDialog(true);
  };

  const handleDelete = (item) => {
    setAllData(allData.filter((i) => i !== item));
  };

  const handleSave = () => {
    if (currentItem.id) {
      setAllData(
        allData.map((i) => (i.id === currentItem.id ? currentItem : i))
      );
    } else {
      setAllData([...allData, { ...currentItem, id: allData.length + 1 }]);
    }
    setShowDialog(false);
  };

  const handleInputChange = (field, value) => {
    setCurrentItem({ ...currentItem, [field]: value });
  };

  return (
    <div className="p-6 min-h-screen bg-background">
      <Card className="border-border/40 shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">
              Location Management
            </CardTitle>
            <Button
              onClick={handleCreate}
              className="bg-primary hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Location
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableBody>
                <TableRow className="bg-[#2f2f2f]">
                  <TableCell>Location Name</TableCell>
                  <TableCell>Location Type</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
                {allData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.locationName}
                    </TableCell>
                    <TableCell>{item.locationType}</TableCell>
                    <TableCell>{item.address}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(item)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-destructive"
                          onClick={() => handleDelete(item)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {currentItem?.id ? "Edit Location" : "Add New Location"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="locationName">Location Name</Label>
              <Input
                id="locationName"
                value={currentItem?.locationName || ""}
                onChange={(e) =>
                  handleInputChange("locationName", e.target.value)
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="locationType">Location Type</Label>
              <Select
                value={currentItem?.locationType || ""}
                onValueChange={(value) =>
                  handleInputChange("locationType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {locationTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={currentItem?.address || ""}
                onChange={(e) => handleInputChange("address", e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
