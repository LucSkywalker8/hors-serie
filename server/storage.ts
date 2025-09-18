import { type Property, type InsertProperty, type Contact, type InsertContact, type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";
import bcrypt from "bcrypt";

export interface IStorage {
  // Properties
  getProperties(): Promise<Property[]>;
  getProperty(id: string): Promise<Property | undefined>;
  getPropertiesByType(type: string): Promise<Property[]>;
  getPropertiesByCity(city: string): Promise<Property[]>;
  searchProperties(filters: {
    type?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    minSurface?: number;
  }): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: string, property: Partial<InsertProperty>): Promise<Property | undefined>;
  updatePropertyOrder(propertyIds: string[]): Promise<void>;
  deleteProperty(id: string): Promise<boolean>;
  
  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  validateUser(username: string, password: string): Promise<User | null>;
}

export class MemStorage implements IStorage {
  private properties: Map<string, Property>;
  private contacts: Map<string, Contact>;
  private users: Map<string, User>;

  constructor() {
    this.properties = new Map();
    this.contacts = new Map();
    this.users = new Map();
    
    // Initialize with sample data and admin user
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    const sampleProperties: InsertProperty[] = [
      {
        title: "Château du XVIIIe siècle",
        description: "Magnifique château restauré avec goût, 8 chambres, parc de 2 hectares, piscine et dépendances.",
        type: "château",
        price: 890000,
        city: "Saumur",
        address: "12 Route du Château, Saumur",
        latitude: "47.2600",
        longitude: "-0.0769",
        surface: 450,
        bedrooms: 8,
        bathrooms: 6,
        landSize: 20000,
        images: [
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Parc 2 hectares", "Piscine", "Dépendances", "Restauré avec goût"],
        status: "available",
        dpeValue: 180,
        dpeClass: "C",
        gesValue: 35,
        gesClass: "C"
      },
      {
        title: "Loft Contemporain",
        description: "Ancien atelier d'artiste transformé en loft lumineux, terrasse privative, garage double.",
        type: "loft",
        price: 425000,
        city: "Angers",
        address: "15 Rue des Arts, Angers Centre",
        latitude: "47.4784",
        longitude: "-0.5632",
        surface: 185,
        bedrooms: 3,
        bathrooms: 2,
        landSize: 0,
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Terrasse privative", "Garage double", "Lumineux", "Ancien atelier d'artiste"],
        status: "available",
        dpeValue: 95,
        dpeClass: "B",
        gesValue: 15,
        gesClass: "B"
      },
      {
        title: "Domaine Viticole",
        description: "Domaine viticole en activité, 15 hectares de vignes, cave voûtée, maison de maître du XIXe.",
        type: "propriété viticole",
        price: 1250000,
        city: "Coteaux du Layon",
        address: "Route des Vignes, Coteaux du Layon",
        latitude: "47.3089",
        longitude: "-0.6059",
        surface: 320,
        bedrooms: 6,
        bathrooms: 4,
        landSize: 150000,
        images: [
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1597149332473-7c365cc44b8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["15 hectares de vignes", "Cave voûtée", "Maison de maître XIXe", "En activité"],
        status: "available",
        dpeValue: 220,
        dpeClass: "D",
        gesValue: 45,
        gesClass: "D"
      },
      {
        title: "Château Historique",
        description: "Château du XVIe siècle, boiseries d'époque, cheminées monumentales, orangerie, étang.",
        type: "château",
        price: 675000,
        city: "Segré",
        address: "3 Place du Manoir, Segré",
        latitude: "47.6875",
        longitude: "-0.8700",
        surface: 380,
        bedrooms: 7,
        bathrooms: 5,
        landSize: 5000,
        images: [
          "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Boiseries d'époque", "Cheminées monumentales", "Orangerie", "Étang"],
        status: "available",
        dpeValue: 280,
        dpeClass: "E",
        gesValue: 60,
        gesClass: "E"
      },
      {
        title: "Villa Contemporaine",
        description: "Villa moderne avec piscine et vue panoramique, domotique, garage triple.",
        type: "villa",
        price: 520000,
        city: "Cholet",
        address: "8 Avenue des Jardins, Cholet",
        latitude: "47.0584",
        longitude: "-0.8789",
        surface: 280,
        bedrooms: 5,
        bathrooms: 3,
        landSize: 1200,
        images: [
          "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Piscine", "Vue panoramique", "Domotique", "Garage triple"],
        status: "available",
        dpeValue: 65,
        dpeClass: "A",
        gesValue: 8,
        gesClass: "A"
      },
      {
        title: "Maison de Maître Cholet",
        description: "Élégante maison de maître du XIXe siècle, escalier d'honneur, salon de musique, bibliothèque.",
        type: "maison de maître",
        price: 465000,
        city: "Cholet",
        address: "8 Boulevard de la République, Cholet",
        latitude: "47.0588",
        longitude: "-0.8776",
        surface: 280,
        bedrooms: 5,
        bathrooms: 3,
        landSize: 1200,
        images: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Escalier d'honneur", "Salon de musique", "Bibliothèque", "Jardin à la française"],
        status: "available",
        dpeValue: 200,
        dpeClass: "D",
        gesValue: 40,
        gesClass: "D"
      },
      {
        title: "Hôtel Particulier Angers",
        description: "Hôtel particulier restauré dans le centre historique d'Angers, 7 chambres, cave voûtée, cour d'honneur.",
        type: "château",
        price: 750000,
        city: "Angers",
        address: "Place Sainte-Croix, Angers Centre",
        latitude: "47.4716",
        longitude: "-0.5515",
        surface: 420,
        bedrooms: 7,
        bathrooms: 5,
        landSize: 800,
        images: [
          "https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Centre historique", "Cave voûtée", "Cour d'honneur", "Restauré"],
        status: "available",
        dpeValue: 160,
        dpeClass: "C",
        gesValue: 32,
        gesClass: "C"
      },
      {
        title: "Maison de Ville Élégante",
        description: "Charmante maison de ville rénovée avec jardin privatif, proche commerces et transports.",
        type: "maison de ville",
        price: 385000,
        city: "Angers",
        address: "22 Rue Victor Hugo, Angers Centre",
        latitude: "47.4712",
        longitude: "-0.5549",
        surface: 160,
        bedrooms: 4,
        bathrooms: 2,
        landSize: 150,
        images: [
          "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Jardin privatif", "Centre-ville", "Rénovée", "Proche transports"],
        status: "available",
        dpeValue: 140,
        dpeClass: "C",
        gesValue: 28,
        gesClass: "C"
      },
      {
        title: "Appartement Moderne",
        description: "Appartement contemporain avec balcon et vue dégagée, résidence sécurisée avec parking.",
        type: "appartement",
        price: 245000,
        city: "Cholet",
        address: "5 Avenue de la Paix, Cholet",
        latitude: "47.0588",
        longitude: "-0.8730",
        surface: 85,
        bedrooms: 2,
        bathrooms: 1,
        landSize: 0,
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
          "https://images.unsplash.com/photo-1560448204-e1a96c2477d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
        ],
        features: ["Balcon", "Vue dégagée", "Parking", "Résidence sécurisée"],
        status: "available",
        dpeValue: 85,
        dpeClass: "B",
        gesValue: 12,
        gesClass: "B"
      }
    ];

    for (let i = 0; i < sampleProperties.length; i++) {
      const property = { ...sampleProperties[i], displayOrder: i };
      await this.createProperty(property);
    }

    // Create default admin user
    await this.createUser({
      username: "luc",
      password: await bcrypt.hash("Menard1983!!", 10)
    });
  }

  // Properties
  async getProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  async getProperty(id: string): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getPropertiesByType(type: string): Promise<Property[]> {
    if (type === "tous") {
      return this.getProperties();
    }
    return Array.from(this.properties.values()).filter(
      (property) => property.type.toLowerCase() === type.toLowerCase()
    );
  }

  async getPropertiesByCity(city: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(property => 
      property.city.toLowerCase().includes(city.toLowerCase())
    );
  }

  async searchProperties(filters: {
    type?: string;
    city?: string;
    minPrice?: number;
    maxPrice?: number;
    minSurface?: number;
  }): Promise<Property[]> {
    let results = Array.from(this.properties.values());

    if (filters.type && filters.type !== "tous") {
      results = results.filter(property => 
        property.type.toLowerCase() === filters.type!.toLowerCase()
      );
    }

    if (filters.city) {
      results = results.filter(property => 
        property.city.toLowerCase().includes(filters.city!.toLowerCase())
      );
    }

    if (filters.minPrice) {
      results = results.filter(property => property.price >= filters.minPrice!);
    }

    if (filters.maxPrice) {
      results = results.filter(property => property.price <= filters.maxPrice!);
    }

    if (filters.minSurface) {
      results = results.filter(property => property.surface >= filters.minSurface!);
    }

    return results;
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = randomUUID();
    const maxOrder = Math.max(-1, ...Array.from(this.properties.values()).map(p => p.displayOrder || 0));
    const property: Property = { 
      ...insertProperty, 
      id,
      status: insertProperty.status || "available",
      features: insertProperty.features || null,
      dpeValue: insertProperty.dpeValue ?? null,
      dpeClass: insertProperty.dpeClass ?? null,
      gesValue: insertProperty.gesValue ?? null,
      gesClass: insertProperty.gesClass ?? null,
      displayOrder: insertProperty.displayOrder ?? maxOrder + 1
    };
    this.properties.set(id, property);
    return property;
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      phone: insertContact.phone || null,
      propertyId: insertContact.propertyId || null,
      createdAt: new Date().toISOString()
    };
    this.contacts.set(id, contact);
    return contact;
  }

  // Properties CRUD operations
  async updateProperty(id: string, updates: Partial<InsertProperty>): Promise<Property | undefined> {
    const existing = this.properties.get(id);
    if (!existing) return undefined;
    
    const updated: Property = {
      ...existing,
      ...updates,
      id: existing.id,
      status: updates.status || existing.status,
      features: updates.features !== undefined ? updates.features : existing.features
    };
    
    this.properties.set(id, updated);
    return updated;
  }

  async updatePropertyOrder(propertyIds: string[]): Promise<void> {
    propertyIds.forEach((id, index) => {
      const property = this.properties.get(id);
      if (property) {
        const updated = { ...property, displayOrder: index };
        this.properties.set(id, updated);
      }
    });
  }

  async deleteProperty(id: string): Promise<boolean> {
    return this.properties.delete(id);
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }
}

export const storage = new MemStorage();
