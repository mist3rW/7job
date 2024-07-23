// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const thaiCities = [
  {
    province: 'Bangkok',
    district: 'Phra Nakhon',
  },
  {
    province: 'Bangkok',
    district: 'Dusit',
  },
  {
    province: 'Bangkok',
    district: 'Nong Chok',
  },
  {
    province: 'Bangkok',
    district: 'Bang Rak',
  },
  {
    province: 'Bangkok',
    district: 'Bang Khen',
  },
  {
    province: 'Bangkok',
    district: 'Bang Kapi',
  },
  {
    province: 'Bangkok',
    district: 'Pathum Wan',
  },
  {
    province: 'Bangkok',
    district: 'Pom Prap Sattru Phai',
  },
  {
    province: 'Bangkok',
    district: 'Phra Khanong',
  },
  {
    province: 'Bangkok',
    district: 'Min Buri',
  },
  {
    province: 'Bangkok',
    district: 'Lat Krabang',
  },
  {
    province: 'Bangkok',
    district: 'Yan Nawa',
  },
  {
    province: 'Bangkok',
    district: 'Samphanthawong',
  },
  {
    province: 'Bangkok',
    district: 'Phaya Thai',
  },
  {
    province: 'Bangkok',
    district: 'Thon Buri',
  },
  {
    province: 'Bangkok',
    district: 'Bangkok Yai',
  },
  {
    province: 'Bangkok',
    district: 'Huai Khwang',
  },
  {
    province: 'Bangkok',
    district: 'Khlong San',
  },
  {
    province: 'Bangkok',
    district: 'Taling Chan',
  },
  {
    province: 'Bangkok',
    district: 'Bangkok Noi',
  },
  {
    province: 'Bangkok',
    district: 'Bang Khun Thian',
  },
  {
    province: 'Bangkok',
    district: 'Phasi Charoen',
  },
  {
    province: 'Bangkok',
    district: 'Nong Khaem',
  },
  {
    province: 'Bangkok',
    district: 'Rat Burana',
  },
  {
    province: 'Bangkok',
    district: 'Bang Phlat',
  },
  {
    province: 'Bangkok',
    district: 'Din Daeng',
  },
  {
    province: 'Bangkok',
    district: 'Bueng Kum',
  },
  {
    province: 'Bangkok',
    district: 'Sathon',
  },
  {
    province: 'Bangkok',
    district: 'Bang Sue',
  },
  {
    province: 'Bangkok',
    district: 'Chatuchak',
  },
  {
    province: 'Bangkok',
    district: 'Bang Kho Laem',
  },
  {
    province: 'Bangkok',
    district: 'Prawet',
  },
  {
    province: 'Bangkok',
    district: 'Khlong Toei',
  },
  {
    province: 'Bangkok',
    district: 'Suan Luang',
  },
  {
    province: 'Bangkok',
    district: 'Chom Thong',
  },
  {
    province: 'Bangkok',
    district: 'Don Mueang',
  },
  {
    province: 'Bangkok',
    district: 'Ratchathewi',
  },
  {
    province: 'Bangkok',
    district: 'Lat Phrao',
  },
  {
    province: 'Bangkok',
    district: 'Watthana',
  },
  {
    province: 'Bangkok',
    district: 'Bang Khae',
  },
  {
    province: 'Bangkok',
    district: 'Lak Si',
  },
  {
    province: 'Bangkok',
    district: 'Sai Mai',
  },
  {
    province: 'Bangkok',
    district: 'Khan Na Yao',
  },
  {
    province: 'Bangkok',
    district: 'Saphan Sung',
  },
  {
    province: 'Bangkok',
    district: 'Wang Thonglang',
  },
  {
    province: 'Bangkok',
    district: 'Khlong Sam Wa',
  },
  {
    province: 'Bangkok',
    district: 'Bang Na',
  },
  {
    province: 'Bangkok',
    district: 'Thawi Watthana',
  },
  {
    province: 'Bangkok',
    district: 'Thung Khru',
  },
  {
    province: 'Bangkok',
    district: 'Bang Bon',
  },
  {
    province: 'Chiang Mai',
    district: 'Mueang Chiang Mai',
  },
  {
    province: 'Chiang Mai',
    district: 'Chom Thong',
  },
  {
    province: 'Chiang Mai',
    district: 'Mae Chaem',
  },
  {
    province: 'Chiang Mai',
    district: 'Chiang Dao',
  },
  {
    province: 'Chiang Mai',
    district: 'Doi Saket',
  },
  {
    province: 'Chiang Mai',
    district: 'Mae Taeng',
  },
  {
    province: 'Chiang Mai',
    district: 'Mae Rim',
  },
  {
    province: 'Chiang Mai',
    district: 'Samoeng',
  },
  {
    province: 'Chiang Mai',
    district: 'Fang',
  },
  {
    province: 'Chiang Mai',
    district: 'Mae Ai',
  },
  {
    province: 'Chiang Mai',
    district: 'Phrao',
  },
  {
    province: 'Chiang Mai',
    district: 'San Pa Tong',
  },
  {
    province: 'Chiang Mai',
    district: 'San Kamphaeng',
  },
  {
    province: 'Chiang Mai',
    district: 'San Sai',
  },
  {
    province: 'Chiang Mai',
    district: 'Hang Dong',
  },
  {
    province: 'Chiang Mai',
    district: 'Hot',
  },
  {
    province: 'Chiang Mai',
    district: 'Doi Tao',
  },
  {
    province: 'Chiang Mai',
    district: 'Omkoi',
  },
  {
    province: 'Chiang Mai',
    district: 'Saraphi',
  },
  {
    province: 'Chiang Mai',
    district: 'Wiang Haeng',
  },
  {
    province: 'Chiang Mai',
    district: 'Chai Prakan',
  },
  {
    province: 'Chiang Mai',
    district: 'Mae Wang',
  },
  {
    province: 'Chiang Mai',
    district: 'Mae On',
  },
  {
    province: 'Chiang Mai',
    district: 'Doi Lo',
  },
  {
    province: 'Chiang Mai',
    district: 'Samoeng Tai',
  },
  {
    province: 'Chon Buri',
    district: 'Mueang Chon Buri',
  },
  {
    province: 'Chon Buri',
    district: 'Bang Lamung',
  },
  {
    province: 'Chon Buri',
    district: 'Phan Thong',
  },
  {
    province: 'Chon Buri',
    district: 'Phanat Nikhom',
  },
  {
    province: 'Chon Buri',
    district: 'Si Racha',
  },
  {
    province: 'Chon Buri',
    district: 'Ko Si Chang',
  },
  {
    province: 'Chon Buri',
    district: 'Sattahip',
  },
  {
    province: 'Chon Buri',
    district: 'Bo Thong',
  },
  {
    province: 'Chon Buri',
    district: 'Nong Yai',
  },
  {
    province: 'Chon Buri',
    district: 'Ban Bueng',
  },
  {
    province: 'Chon Buri',
    district: 'Ban Bueng',
  },
  {
    province: 'Chon Buri',
    district: 'Chon Buri',
  },
  {
    province: 'Chon Buri',
    district: 'Bangsaen',
  },
  {
    province: 'Chon Buri',
    district: 'Pattaya',
  },
  {
    province: 'Chon Buri',
    district: 'Laem Chabang',
  },
  {
    province: 'Chon Buri',
    district: 'Amata City',
  },
  {
    province: 'Pathum Thani',
    district: 'Mueang Pathum Thani',
  },
  {
    province: 'Pathum Thani',
    district: 'Khlong Luang',
  },
  {
    province: 'Pathum Thani',
    district: 'Thanyaburi',
  },
  {
    province: 'Pathum Thani',
    district: 'Nong Suea',
  },
  {
    province: 'Pathum Thani',
    district: 'Lat Lum Kaeo',
  },
  {
    province: 'Pathum Thani',
    district: 'Lam Luk Ka',
  },
  {
    province: 'Pathum Thani',
    district: 'Sam Khok',
  },
  {
    province: 'Nonthaburi',
    district: 'Mueang Nonthaburi',
  },
  {
    province: 'Nonthaburi',
    district: 'Bang Kruai',
  },
  {
    province: 'Nonthaburi',
    district: 'Bang Yai',
  },
  {
    province: 'Nonthaburi',
    district: 'Bang Bua Thong',
  },
  {
    province: 'Nonthaburi',
    district: 'Sai Noi',
  },
  {
    province: 'Nonthaburi',
    district: 'Pak Kret',
  },
  {
    province: 'Samut Prakan',
    district: 'Mueang Samut Prakan',
  },
  {
    province: 'Samut Prakan',
    district: 'Bang Bo',
  },
  {
    province: 'Samut Prakan',
    district: 'Bang Phli',
  },
  {
    province: 'Samut Prakan',
    district: 'Phra Pradaeng',
  },
  {
    province: 'Samut Prakan',
    district: 'Phra Samut Chedi',
  },
  {
    province: 'Samut Prakan',
    district: 'Bang Sao Thong',
  },
];

async function main() {
  const jobs = [];

  for (let i = 0; i < 60; i++) {
    const randomLocation = faker.helpers.arrayElement(thaiCities);
    jobs.push({
      id: faker.string.uuid(),
      slug: faker.helpers.slugify(faker.company.bs()),
      title: faker.person.jobTitle(),
      description: faker.lorem.paragraphs({ min: 3, max: 5 }),
      companyLogo: faker.image.url(),
      companyName: faker.company.name(),
      applyUrl: faker.internet.url(),
      applyEmail: faker.internet.email(),
      location: `${randomLocation.district}, ${randomLocation.province}`,
      salary: faker.number.int({ min: 12000, max: 120000 }),
      type: faker.helpers.arrayElement([
        'Full-time',
        'Part-time',
        'Contract',
        'Internship',
        'Temporary',
      ]),
    });
  }

  await prisma.job.createMany({
    data: jobs,
  });

  console.log('Seed data inserted successfully.');
}

main()
  .catch((e) => {
    console.error('Error while seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
