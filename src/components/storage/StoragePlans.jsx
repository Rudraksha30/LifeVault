const storagePlans = [
  {
    id: "mini",
    name: "Mini Pack",
    storageGB: 5,
    price: 60,
    type: "one-time",
    repeatable: true,
    description: "Add 5 GB to your LifeVault storage.",
  },

  {
    id: "pro",
    name: "Pro",
    storageGB: 10,
    price: 110,
    type: "one-time",
    repeatable: true,
    description: "Add 10 GB of storage at a discounted price.",
  },

  {
    id: "premium",
    name: "Premium",
    storageGB: 50,
    price: 450,
    type: "one-time",
    repeatable: false,
    description: "Add 50 GB of storage. Available only once per account.",
  },
];

export default storagePlans;
