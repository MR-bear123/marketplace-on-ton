import 'dotenv/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
// import { v4 as uuidv4 } from 'uuid';
// const SUPABASE_STORAGE_URL = process.env.SUPABASE_STORAGE_URL!;
const SUPABASE_BASE_URL = process.env.SUPABASE_BASE_URL!;
const SUPABASE_NON_PUBLIC_KEY = process.env.SUPABASE_NON_PUBLIC_KEY!;

const supabase: SupabaseClient = createClient(
  SUPABASE_BASE_URL,
  SUPABASE_NON_PUBLIC_KEY,
);

const SupabaseUtil = {
  async Upload(file: Express.Multer.File, fileId: string): Promise<string> {
    const fileName = `${fileId}.${file.originalname.split('.').pop()}`;
    const { error } = await supabase.storage
      .from('marketplace-on-ton')
      .upload(fileName, file.buffer, {
        cacheControl: '3600',
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) throw new Error(`Upload failed: ${error.message}`);
    return `${SUPABASE_BASE_URL}/storage/v1/object/public/marketplace-on-ton/${fileName}`;
  },

  async Delete(storage_path_arr: string[]): Promise<void> {
    const { data, error } = await supabase.storage
      .from('marketplace-on-ton')
      .remove(storage_path_arr);

    if (error) {
      console.error('Delete Error:', error);
    } else {
      console.log('Delete Success:', data);
    }
  },

  async GetPublicImageUrl(url: string): Promise<string | null> {
    // url: Generated image name or path to image file in local
    const { data } = supabase.storage.from('marketplace-on-ton').getPublicUrl(url);
  
    if (data) {
      return data.publicUrl;
    }
  
    return null;
  }
};

export default SupabaseUtil;
