import mongoose from "mongoose";
import dotenv from "dotenv";
import Destination from "./models/Destination.js";
dotenv.config({ path: new URL("../.env", import.meta.url) });
const destinations = [
  {
    "name": "Borra Caves",
    "state": "Andhra Pradesh",
    "city": "Visakhapatnam",
    "category": "Nature",
    "description": "Limestone caves in the Ananthagiri hills, known for striking stalactite and stalagmite formations.",
    "bestTime": "October to March",
    "entryFee": "Entry tickets and local transport charges apply",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Borra+Caves",
    "imageUrl": "",
    "nearbyAttractions": [
      "Araku Valley",
      "Katiki Waterfalls"
    ],
    "featured": false
  },
  {
    "name": "Tawang Monastery",
    "state": "Arunachal Pradesh",
    "city": "Tawang",
    "category": "Culture",
    "description": "A major Himalayan Buddhist monastery overlooking the Tawang valley, with important religious and cultural heritage.",
    "bestTime": "March to October",
    "entryFee": "Check current local entry and permit requirements",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Tawang+Monastery",
    "imageUrl": "",
    "nearbyAttractions": [
      "Sela Pass",
      "Tawang War Memorial"
    ],
    "featured": false
  },
  {
    "name": "Kamakhya Temple",
    "state": "Assam",
    "city": "Guwahati",
    "category": "Religious",
    "description": "A revered hilltop temple on Nilachal Hill and an important centre of Shakti worship.",
    "bestTime": "October to April",
    "entryFee": "Darshan and special access arrangements may vary",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Kamakhya+Temple",
    "imageUrl": "",
    "nearbyAttractions": [
      "Umananda Temple",
      "Brahmaputra Riverfront"
    ],
    "featured": false
  },
  {
    "name": "Mahabodhi Temple",
    "state": "Bihar",
    "city": "Bodh Gaya",
    "category": "Religious",
    "description": "A UNESCO-listed Buddhist pilgrimage complex associated with the Buddha's enlightenment.",
    "bestTime": "October to March",
    "entryFee": "Check current temple visitor guidance",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Mahabodhi+Temple",
    "imageUrl": "",
    "nearbyAttractions": [
      "Great Buddha Statue",
      "Sujata Stupa"
    ],
    "featured": false
  },
  {
    "name": "Chitrakote Falls",
    "state": "Chhattisgarh",
    "city": "Jagdalpur",
    "category": "Nature",
    "description": "A broad horseshoe-shaped waterfall on the Indravati River, especially dramatic during and after the monsoon.",
    "bestTime": "July to February",
    "entryFee": "Local access and boating charges may apply",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Chitrakote+Falls",
    "imageUrl": "",
    "nearbyAttractions": [
      "Tirathgarh Falls",
      "Kanger Valley National Park"
    ],
    "featured": false
  },
  {
    "name": "Palolem Beach",
    "state": "Goa",
    "city": "South Goa",
    "category": "Beach",
    "description": "A scenic crescent-shaped beach known for its palm-lined shore, calm-season waters and nearby cafes.",
    "bestTime": "November to February",
    "entryFee": "Beach access is free; activities are charged separately",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Palolem+Beach",
    "imageUrl": "",
    "nearbyAttractions": [
      "Agonda Beach",
      "Cabo de Rama Fort"
    ],
    "featured": false
  },
  {
    "name": "Statue of Unity",
    "state": "Gujarat",
    "city": "Kevadia",
    "category": "Heritage",
    "description": "A monumental statue near the Narmada River, with viewing areas and attractions in the surrounding valley.",
    "bestTime": "October to February",
    "entryFee": "Ticket prices vary by attractions selected",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Statue+of+Unity",
    "imageUrl": "",
    "nearbyAttractions": [
      "Valley of Flowers",
      "Sardar Sarovar Dam"
    ],
    "featured": false
  },
  {
    "name": "Brahma Sarovar",
    "state": "Haryana",
    "city": "Kurukshetra",
    "category": "Religious",
    "description": "A large sacred water tank associated with the Mahabharata and important Hindu pilgrimage traditions.",
    "bestTime": "October to March",
    "entryFee": "Generally free; special events may have arrangements",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Brahma+Sarovar",
    "imageUrl": "",
    "nearbyAttractions": [
      "Jyotisar",
      "Sheikh Chilli's Tomb"
    ],
    "featured": false
  },
  {
    "name": "The Ridge",
    "state": "Himachal Pradesh",
    "city": "Shimla",
    "category": "Nature",
    "description": "A prominent open promenade in central Shimla offering mountain views and access to historic town landmarks.",
    "bestTime": "March to June; September to November",
    "entryFee": "Free public area",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=The+Ridge",
    "imageUrl": "",
    "nearbyAttractions": [
      "Christ Church",
      "Jakhu Temple"
    ],
    "featured": false
  },
  {
    "name": "Baidyanath Temple",
    "state": "Jharkhand",
    "city": "Deoghar",
    "category": "Religious",
    "description": "A major Shiva pilgrimage site and one of the traditional twelve Jyotirlinga shrines.",
    "bestTime": "October to March",
    "entryFee": "Darshan arrangements and special passes vary",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Baidyanath+Temple",
    "imageUrl": "",
    "nearbyAttractions": [
      "Trikuta Hills",
      "Nandan Pahar"
    ],
    "featured": false
  },
  {
    "name": "Mysore Palace",
    "state": "Karnataka",
    "city": "Mysuru",
    "category": "Heritage",
    "description": "A grand royal palace celebrated for Indo-Saracenic architecture, ornate interiors and illuminated evenings.",
    "bestTime": "October to March",
    "entryFee": "Paid entry; check official visitor rates",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Mysore+Palace",
    "imageUrl": "",
    "nearbyAttractions": [
      "Chamundi Hills",
      "St. Philomena's Church"
    ],
    "featured": false
  },
  {
    "name": "Alappuzha Backwaters",
    "state": "Kerala",
    "city": "Alappuzha",
    "category": "Nature",
    "description": "A network of canals, lagoons and waterways lined with villages, paddy fields and coconut palms.",
    "bestTime": "November to February",
    "entryFee": "Boat and houseboat rates vary by operator",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Alappuzha+Backwaters",
    "imageUrl": "",
    "nearbyAttractions": [
      "Marari Beach",
      "Pathiramanal Island"
    ],
    "featured": false
  },
  {
    "name": "Khajuraho Group of Monuments",
    "state": "Madhya Pradesh",
    "city": "Khajuraho",
    "category": "Heritage",
    "description": "A UNESCO-listed group of temples known for detailed stone carvings and medieval Indian temple architecture.",
    "bestTime": "October to March",
    "entryFee": "Paid entry; rates vary by visitor category",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Khajuraho+Group+of+Monuments",
    "imageUrl": "",
    "nearbyAttractions": [
      "Raneh Falls",
      "Panna National Park"
    ],
    "featured": false
  },
  {
    "name": "Ajanta Caves",
    "state": "Maharashtra",
    "city": "Chhatrapati Sambhajinagar",
    "category": "Heritage",
    "description": "Rock-cut Buddhist cave monuments with celebrated murals and sculptures spanning several centuries.",
    "bestTime": "November to March",
    "entryFee": "Paid entry; check ASI visitor information",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Ajanta+Caves",
    "imageUrl": "",
    "nearbyAttractions": [
      "Ellora Caves",
      "Bibi Ka Maqbara"
    ],
    "featured": false
  },
  {
    "name": "Loktak Lake",
    "state": "Manipur",
    "city": "Imphal",
    "category": "Nature",
    "description": "Northeast India's largest freshwater lake, famous for floating phumdis and scenic island landscapes.",
    "bestTime": "October to March",
    "entryFee": "Boat rides and local activities are charged separately",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Loktak+Lake",
    "imageUrl": "",
    "nearbyAttractions": [
      "Keibul Lamjao National Park",
      "INA Memorial"
    ],
    "featured": false
  },
  {
    "name": "Living Root Bridges",
    "state": "Meghalaya",
    "city": "East Khasi Hills",
    "category": "Nature",
    "description": "Remarkable bridges grown and shaped from living rubber-tree roots by Khasi communities.",
    "bestTime": "October to April",
    "entryFee": "Local guide and village access contributions may apply",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Living+Root+Bridges",
    "imageUrl": "",
    "nearbyAttractions": [
      "Mawlynnong",
      "Nongriat"
    ],
    "featured": false
  },
  {
    "name": "Durtlang Hills",
    "state": "Mizoram",
    "city": "Aizawl",
    "category": "Nature",
    "description": "A hill viewpoint overlooking Aizawl, offering broad views of the city and surrounding green ridges.",
    "bestTime": "October to March",
    "entryFee": "Generally free; local transport costs apply",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Durtlang+Hills",
    "imageUrl": "",
    "nearbyAttractions": [
      "Solomon's Temple",
      "Mizoram State Museum"
    ],
    "featured": false
  },
  {
    "name": "Kohima War Cemetery",
    "state": "Nagaland",
    "city": "Kohima",
    "category": "Heritage",
    "description": "A memorial cemetery commemorating soldiers who died in the Battle of Kohima during World War II.",
    "bestTime": "October to April",
    "entryFee": "Free; donations may be accepted",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Kohima+War+Cemetery",
    "imageUrl": "",
    "nearbyAttractions": [
      "Kisama Heritage Village",
      "Kohima Museum"
    ],
    "featured": false
  },
  {
    "name": "Jagannath Temple",
    "state": "Odisha",
    "city": "Puri",
    "category": "Religious",
    "description": "A major Hindu pilgrimage temple known for its annual Rath Yatra and distinctive Kalinga architecture.",
    "bestTime": "October to February",
    "entryFee": "Temple access rules apply; non-Hindus should check entry policy",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Jagannath+Temple",
    "imageUrl": "",
    "nearbyAttractions": [
      "Puri Beach",
      "Konark Sun Temple"
    ],
    "featured": false
  },
  {
    "name": "Golden Temple",
    "state": "Punjab",
    "city": "Amritsar",
    "category": "Religious",
    "description": "Sri Harmandir Sahib, a revered Sikh shrine known for its sacred pool and community kitchen.",
    "bestTime": "October to March",
    "entryFee": "Free; donations are voluntary",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Golden+Temple",
    "imageUrl": "",
    "nearbyAttractions": [
      "Jallianwala Bagh",
      "Partition Museum"
    ],
    "featured": false
  },
  {
    "name": "Hawa Mahal",
    "state": "Rajasthan",
    "city": "Jaipur",
    "category": "Heritage",
    "description": "The Palace of Winds, famous for its pink honeycomb facade and hundreds of small windows.",
    "bestTime": "October to March",
    "entryFee": "Paid entry; check current ticket rates",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Hawa+Mahal",
    "imageUrl": "",
    "nearbyAttractions": [
      "City Palace",
      "Jantar Mantar"
    ],
    "featured": false
  },
  {
    "name": "Tsomgo Lake",
    "state": "Sikkim",
    "city": "Gangtok",
    "category": "Nature",
    "description": "A high-altitude glacial lake surrounded by mountains; permits and weather conditions affect access.",
    "bestTime": "March to May; October to December",
    "entryFee": "Permit and transport costs apply",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Tsomgo+Lake",
    "imageUrl": "",
    "nearbyAttractions": [
      "Baba Harbhajan Singh Temple",
      "Nathula Pass"
    ],
    "featured": false
  },
  {
    "name": "Meenakshi Amman Temple",
    "state": "Tamil Nadu",
    "city": "Madurai",
    "category": "Religious",
    "description": "A historic temple complex celebrated for towering gopurams, colourful sculptures and Dravidian architecture.",
    "bestTime": "October to March",
    "entryFee": "Free general entry; special services may be charged",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Meenakshi+Amman+Temple",
    "imageUrl": "",
    "nearbyAttractions": [
      "Thirumalai Nayakkar Palace",
      "Gandhi Memorial Museum"
    ],
    "featured": false
  },
  {
    "name": "Charminar",
    "state": "Telangana",
    "city": "Hyderabad",
    "category": "Heritage",
    "description": "A 16th-century monument and defining landmark of Hyderabad's historic old city.",
    "bestTime": "October to February",
    "entryFee": "Paid monument entry; check current rates",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Charminar",
    "imageUrl": "",
    "nearbyAttractions": [
      "Laad Bazaar",
      "Mecca Masjid"
    ],
    "featured": false
  },
  {
    "name": "Ujjayanta Palace",
    "state": "Tripura",
    "city": "Agartala",
    "category": "Heritage",
    "description": "A former royal palace with Indo-Saracenic features, now housing the Tripura State Museum.",
    "bestTime": "October to March",
    "entryFee": "Museum entry fee may apply",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Ujjayanta+Palace",
    "imageUrl": "",
    "nearbyAttractions": [
      "Neermahal",
      "Tripura Sundari Temple"
    ],
    "featured": false
  },
  {
    "name": "Taj Mahal",
    "state": "Uttar Pradesh",
    "city": "Agra",
    "category": "Heritage",
    "description": "A UNESCO-listed white-marble mausoleum built by Shah Jahan, renowned for its symmetry and craftsmanship.",
    "bestTime": "October to March",
    "entryFee": "Paid entry; rates vary by visitor category",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Taj+Mahal",
    "imageUrl": "",
    "nearbyAttractions": [
      "Agra Fort",
      "Mehtab Bagh"
    ],
    "featured": false
  },
  {
    "name": "Ram Jhula",
    "state": "Uttarakhand",
    "city": "Rishikesh",
    "category": "Culture",
    "description": "A suspension bridge across the Ganges connecting ashrams, temples and riverside walking routes.",
    "bestTime": "September to November; March to May",
    "entryFee": "Free public crossing; nearby activities cost extra",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Ram+Jhula",
    "imageUrl": "",
    "nearbyAttractions": [
      "Triveni Ghat",
      "Neer Garh Waterfall"
    ],
    "featured": false
  },
  {
    "name": "Victoria Memorial",
    "state": "West Bengal",
    "city": "Kolkata",
    "category": "Heritage",
    "description": "A marble landmark and museum surrounded by gardens, documenting aspects of Kolkata's colonial-era history.",
    "bestTime": "October to March",
    "entryFee": "Paid museum entry; garden access may be separate",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Victoria+Memorial",
    "imageUrl": "",
    "nearbyAttractions": [
      "Indian Museum",
      "St. Paul's Cathedral"
    ],
    "featured": false
  },
  {
    "name": "Radhanagar Beach",
    "state": "Andaman and Nicobar Islands",
    "city": "Sri Vijaya Puram",
    "category": "Beach",
    "description": "A celebrated white-sand beach on Swaraj Dweep, known for clear water and sunset views.",
    "bestTime": "November to April",
    "entryFee": "Generally free; water activities cost extra",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Radhanagar+Beach",
    "imageUrl": "",
    "nearbyAttractions": [
      "Elephant Beach",
      "Kalapathar Beach"
    ],
    "featured": false
  },
  {
    "name": "Rock Garden",
    "state": "Chandigarh",
    "city": "Chandigarh",
    "category": "Culture",
    "description": "An artistic garden created from recycled materials, featuring sculptures, courtyards and winding pathways.",
    "bestTime": "October to March",
    "entryFee": "Paid entry; check current rates",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Rock+Garden",
    "imageUrl": "",
    "nearbyAttractions": [
      "Sukhna Lake",
      "Capitol Complex"
    ],
    "featured": false
  },
  {
    "name": "Diu Fort",
    "state": "Dadra and Nagar Haveli and Daman and Diu",
    "city": "Diu",
    "category": "Heritage",
    "description": "A coastal Portuguese-era fort overlooking the Arabian Sea, with sea-facing ramparts and historic structures.",
    "bestTime": "October to March",
    "entryFee": "Entry arrangements may vary",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Diu+Fort",
    "imageUrl": "",
    "nearbyAttractions": [
      "Nagoa Beach",
      "St. Paul's Church"
    ],
    "featured": false
  },
  {
    "name": "Humayun's Tomb",
    "state": "Delhi",
    "city": "New Delhi",
    "category": "Heritage",
    "description": "A UNESCO-listed Mughal garden tomb whose design influenced later Mughal architecture.",
    "bestTime": "October to March",
    "entryFee": "Paid entry; check ASI rates",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Humayun's+Tomb",
    "imageUrl": "",
    "nearbyAttractions": [
      "India Gate",
      "Lodhi Garden"
    ],
    "featured": false
  },
  {
    "name": "Dal Lake",
    "state": "Jammu and Kashmir",
    "city": "Srinagar",
    "category": "Nature",
    "description": "An iconic Himalayan lake known for houseboats, shikara rides, floating gardens and mountain scenery.",
    "bestTime": "April to October",
    "entryFee": "Shikara and houseboat charges vary",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Dal+Lake",
    "imageUrl": "",
    "nearbyAttractions": [
      "Mughal Gardens",
      "Shankaracharya Temple"
    ],
    "featured": false
  },
  {
    "name": "Pangong Tso",
    "state": "Ladakh",
    "city": "Leh",
    "category": "Nature",
    "description": "A high-altitude Himalayan lake famous for changing shades of blue and dramatic mountain surroundings.",
    "bestTime": "May to September",
    "entryFee": "Permits and transport costs may apply",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Pangong+Tso",
    "imageUrl": "",
    "nearbyAttractions": [
      "Thiksey Monastery",
      "Chang La"
    ],
    "featured": false
  },
  {
    "name": "Agatti Island Lagoon",
    "state": "Lakshadweep",
    "city": "Agatti",
    "category": "Beach",
    "description": "A turquoise lagoon and coral-island setting known for clear waters and marine activities; entry permits are required.",
    "bestTime": "October to March",
    "entryFee": "Permits and activity charges apply",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Agatti+Island+Lagoon",
    "imageUrl": "",
    "nearbyAttractions": [
      "Bangaram Island",
      "Kalpitti Island"
    ],
    "featured": false
  },
  {
    "name": "Promenade Beach",
    "state": "Puducherry",
    "city": "Puducherry",
    "category": "Beach",
    "description": "A popular seafront promenade near the French Quarter, best enjoyed during early morning and evening walks.",
    "bestTime": "November to February",
    "entryFee": "Free public access",
    "locationUrl": "https://www.google.com/maps/search/?api=1&query=Promenade+Beach",
    "imageUrl": "",
    "nearbyAttractions": [
      "French Quarter",
      "Sri Aurobindo Ashram"
    ],
    "featured": false
  }
];

if (!process.env.MONGODB_URI) {
  console.error("MONGODB_URI is missing. Set it in server/.env before seeding.");
  process.exit(1);
}
await mongoose.connect(process.env.MONGODB_URI);
for (const place of destinations) {
  await Destination.updateOne(
    { name: place.name, state: place.state, city: place.city },
    { $set: place },
    { upsert: true, runValidators: true }
  );
}
console.log(`Added or updated ${destinations.length} sample destinations across all 28 states and 8 Union Territories.`);
await mongoose.disconnect();
