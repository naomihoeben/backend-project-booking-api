import { PrismaClient } from "@prisma/client";
import userData from "../src/data/users.json" assert { type: "json" };
import hostData from "../src/data/hosts.json" assert { type: "json" };
import propertyData from "../src/data/properties.json" assert { type: "json" };
import amenityData from "../src/data/amenities.json" assert { type: "json" };
import bookingData from "../src/data/bookings.json" assert { type: "json" };
import reviewData from "../src/data/reviews.json" assert { type: "json" };
import propertyAmenitiesData from "../src/data/propertyAmenities.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
	try {
		console.log("Seeding database...");

		// Voeg gebruikers toe
		for (const user of userData.users) {
			await prisma.user.upsert({
				where: { id: user.id },
				update: {},
				create: {
					id: user.id,
					username: user.username,
					password: user.password,
					name: user.name,
					email: user.email,
					phoneNumber: user.phoneNumber,
					profilePicture: user.profilePicture,
				},
			});
		}
		console.log("Gebruikers toegevoegd.");

		// Voeg hosts toe
		for (const host of hostData.hosts) {
			await prisma.host.upsert({
				where: { id: host.id },
				update: {},
				create: {
					id: host.id,
					username: host.username,
					password: host.password,
					name: host.name,
					email: host.email,
					phoneNumber: host.phoneNumber,
					profilePicture: host.profilePicture,
					aboutMe: host.aboutMe,
				},
			});
		}
		console.log("Hosts toegevoegd.");

		// Voeg properties toe
		for (const property of propertyData.properties) {
			await prisma.property.upsert({
				where: { id: property.id },
				update: {},
				create: {
					...property,
				},
			});
		}
		console.log("Properties toegevoegd.");

		// Voeg amenities toe
		for (const amenity of amenityData.amenities) {
			await prisma.amenity.upsert({
				where: { id: amenity.id },
				update: {},
				create: amenity,
			});
		}
		console.log("Amenities toegevoegd.");

		// Voeg relaties tussen properties en amenities toe
		for (const relation of propertyAmenitiesData.propertyAmenities) {
			try {
				await prisma.propertyAmenity.upsert({
					where: { propertyId_amenityId: { propertyId: relation.propertyId, amenityId: relation.amenityId } },
					update: {},
					create: {
						propertyId: relation.propertyId,
						amenityId: relation.amenityId,
					},
				});
			} catch (error) {
				console.error(
					`Fout bij koppelen van property ${relation.propertyId} aan amenity ${relation.amenityId}:`,
					error.message
				);
			}
		}
		console.log("Relaties tussen properties en amenities toegevoegd.");

		// Voeg bookings toe
		for (const booking of bookingData.bookings) {
			await prisma.booking.upsert({
				where: { id: booking.id },
				update: {},
				create: booking,
			});
		}
		console.log("Bookings toegevoegd.");

		// Voeg reviews toe
		for (const review of reviewData.reviews) {
			await prisma.review.upsert({
				where: { id: review.id },
				update: {},
				create: review,
			});
		}
		console.log("Reviews toegevoegd.");

		console.log("Seeding voltooid!");
	} catch (error) {
		console.error("Fout tijdens seeding:", error.message);
	} finally {
		await prisma.$disconnect();
	}
}

main();
