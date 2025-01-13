-- CreateTable
CREATE TABLE "PropertyAmenity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "propertyId" TEXT NOT NULL,
    "amenityId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PropertyAmenity_propertyId_amenityId_key" ON "PropertyAmenity"("propertyId", "amenityId");
