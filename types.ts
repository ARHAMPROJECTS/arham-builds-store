
import React from 'react';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
  category: string;
}

export interface Feature {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string; // Unique identifier for routing
  title: string;
  description: string;
  currentPrice: number;
  originalPrice?: number;
  thumbnailUrl: string;
  videoUrl?: string; // Optional video preview
  features: Feature[];
  category: string;
  demoUrl?: string;
  checkoutUrl: string;
  comingSoon?: boolean;
  stockCount?: number; // New field: undefined = unlimited, 0 = out of stock, >0 = specific stock
  badge?: 'Hot Sell' | 'Trending' | 'Latest';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Skill {
  name: string;
  percentage: number;
  icon?: React.ReactNode;
}

export interface Achievement {
  id: number;
  text: string;
}

export interface Log {
  id: string;
  type: 'Work' | 'Pic' | 'Update';
  date: string;
  title: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  link?: string;
}
