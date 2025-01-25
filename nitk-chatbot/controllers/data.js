const data = [
    {
        locationName: 'Health Care Centre (HCC)',
        locationType: 'medical',
        address: 'Near Adke Circle',
        description: 'Provides medical services and emergency care for students and staff.',
        openTime: '9:10am',
        closeTime: '9:00pm',
        coordinates: {
            lat: 12.971598,
            lng: 74.793854
        },
        reviews: [
            {
                user: 'John Doe',
                comment: 'Very helpful staff, quick service during emergencies.',
                rating: 5
            },
            {
                user: 'Jane Smith',
                comment: 'The waiting time can be a bit long.',
                rating: 3
            }
        ]
    },
    {
        locationName: 'Swimming Pool',
        locationType: 'sports',
        address: 'Near Girls hostel and mechanical department',
        description: 'Olympic-sized swimming pool for students and staff. Perfect for fitness and relaxation.',
        openTime: '6:00am',
        closeTime: '6:00pm',
        coordinates: {
            lat: 12.973450,
            lng: 74.794012
        },
        reviews: [
            {
                user: 'Michael Johnson',
                comment: 'Great pool, but sometimes gets crowded during peak hours.',
                rating: 4
            },
            {
                user: 'Emma Davis',
                comment: 'I love the clean facilities and the pool size.',
                rating: 5
            }
        ]
    },
    {
        locationName: 'Main Library',
        locationType: 'library',
        address: 'Main Academic Block',
        description: 'Central library with a vast collection of books, journals, and study spaces.',
        openTime: '8:00am',
        closeTime: '9:00pm',
        coordinates: {
            lat: 12.971200,
            lng: 74.792500
        },
        reviews: [
            {
                user: 'Ava Wilson',
                comment: 'The library has a great selection of books and quiet study areas.',
                rating: 5
            },
            {
                user: 'Liam Brown',
                comment: 'Could use more electrical outlets for charging laptops.',
                rating: 4
            }
        ]
    },
    {
        locationName: 'E-Library',
        locationType: 'library',
        address: 'Main Academic Block, 2nd Floor',
        description: 'Digital library with access to e-books, research papers, and online resources.',
        openTime: '8:00am',
        closeTime: '10:00pm',
        coordinates: {
            lat: 12.971300,
            lng: 74.792600
        },
        reviews: [
            {
                user: 'Sophia Garcia',
                comment: 'Perfect place for research, but sometimes the Wi-Fi can be slow.',
                rating: 4
            },
            {
                user: 'Jackson Miller',
                comment: 'I love the access to so many digital resources.',
                rating: 5
            }
        ]
    },
    {
        locationName: 'Sports Complex',
        locationType: 'sports',
        address: 'Near Boys Hostel',
        description: 'Facilities for indoor and outdoor sports, including basketball, badminton, and table tennis.',
        openTime: '6:00am',
        closeTime: '9:00pm',
        coordinates: {
            lat: 12.972100,
            lng: 74.791800
        },
        reviews: [
            {
                user: 'Olivia Martinez',
                comment: 'Good variety of sports facilities, but it gets busy in the evenings.',
                rating: 4
            },
            {
                user: 'Ethan Thomas',
                comment: 'Great place for fitness enthusiasts.',
                rating: 5
            }
        ]
    },
    {
        locationName: 'Student Activity Center (SAC)',
        locationType: 'recreation',
        address: 'Near Girls Hostel',
        description: 'Hub for student activities, events, and cultural programs. Includes a cafeteria and lounge area.',
        openTime: '8:00am',
        closeTime: '11:00pm',
        coordinates: {
            lat: 12.971800,
            lng: 74.792200
        },
        reviews: [
            {
                user: 'Mason Lee',
                comment: 'Great place for events and hanging out with friends.',
                rating: 5
            },
            {
                user: 'Isabella Walker',
                comment: 'The food at the cafeteria could be improved.',
                rating: 3
            }
        ]
    },
    {
        locationName: 'NITK Beach',
        locationType: 'outdoor',
        address: 'Behind NITK Campus',
        description: 'Scenic beach for relaxation, jogging, and enjoying sunsets. Popular among students.',
        openTime: '6:00am',
        closeTime: '7:00pm',
        coordinates: {
            lat: 12.969000,
            lng: 74.789900
        },
        reviews: [
            {
                user: 'Charlotte Harris',
                comment: 'Beautiful beach, perfect for evening walks and relaxation.',
                rating: 5
            },
            {
                user: 'James Young',
                comment: 'Too many people during weekends.',
                rating: 3
            }
        ]
    }
];

module.exports = data;
