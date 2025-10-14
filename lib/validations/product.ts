import { z } from 'zod';

/**
 * Validation schema for product creation/update
 */
export const productSchema = z.object({
  name: z
    .string()
    .min(3, 'Nom trop court (minimum 3 caractères)')
    .max(100, 'Nom trop long (maximum 100 caractères)')
    .trim(),
  description: z
    .string()
    .min(10, 'Description trop courte (minimum 10 caractères)')
    .max(1000, 'Description trop longue (maximum 1000 caractères)')
    .trim(),
  price: z
    .number()
    .positive('Le prix doit être positif')
    .max(100, 'Prix maximum: 100€')
    .refine((val) => Number.isFinite(val), 'Le prix doit être un nombre valide')
    .refine(
      (val) => {
        // Check for at most 2 decimal places
        const decimalPlaces = (val.toString().split('.')[1] || '').length;
        return decimalPlaces <= 2;
      },
      'Le prix ne peut avoir que 2 décimales maximum'
    ),
  category: z.enum(['pizza', 'boisson', 'dessert', 'accompagnement']),
  image: z
    .string()
    .url('URL de l\'image invalide')
    .max(500, 'URL de l\'image trop longue')
    .refine(
      (url) => {
        // Check if URL points to an image
        return /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(url);
      },
      'L\'URL doit pointer vers un fichier image (jpg, png, webp, avif, gif)'
    ),
  ingredients: z
    .array(
      z
        .string()
        .min(2, 'Nom d\'ingrédient trop court')
        .max(100, 'Nom d\'ingrédient trop long')
        .trim()
    )
    .max(20, 'Maximum 20 ingrédients par produit')
    .optional()
    .default([]),
  available: z.boolean().default(true),
  popular: z.boolean().default(false),
  spicy: z.boolean().default(false),
  vegetarian: z.boolean().default(false),
  tags: z
    .array(
      z
        .string()
        .min(2, 'Tag trop court')
        .max(50, 'Tag trop long')
        .trim()
    )
    .max(10, 'Maximum 10 tags par produit')
    .optional()
    .default([]),
  stock: z
    .number()
    .int('Le stock doit être un nombre entier')
    .nonnegative('Le stock doit être positif ou nul')
    .max(1000, 'Stock maximum: 1000')
    .default(100),
  minStock: z
    .number()
    .int('Le stock minimum doit être un nombre entier')
    .nonnegative('Le stock minimum doit être positif ou nul')
    .max(100, 'Stock minimum maximum: 100')
    .default(10),
}).refine(
  (data) => {
    // Ensure minStock is less than or equal to stock
    return data.minStock <= data.stock;
  },
  {
    message: 'Le stock minimum doit être inférieur ou égal au stock actuel',
    path: ['minStock'],
  }
);

/**
 * Validation schema for partial product updates (PATCH)
 */
export const productUpdateSchema = productSchema.partial();

/**
 * Type inference from Zod schema
 */
export type ProductValidation = z.infer<typeof productSchema>;
export type ProductUpdateValidation = z.infer<typeof productUpdateSchema>;
