
export interface TemplateInputs {
  brand_name?: string;
  product_type?: string;
  magazine_name?: string;
  background_color?: string;
}

export interface TemplateField {
  id: keyof TemplateInputs;
  label: string;
  placeholder: string;
}

export interface Template {
  id: string;
  name: string;
  thumbnail: string;
  prompt: string;
  fields?: TemplateField[];
}
