import { createClient } from '@supabase/supabase-js';

// Configuração do cliente Supabase
const supabaseUrl = 'https://brkzzcxlzllvxvjtpail.supabase.co';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJya3p6Y3hsemxsdnh2anRwYWlsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzU2MTE3OCwiZXhwIjoyMDU5MTM3MTc4fQ.UTB9tMrauZd0dkr-zbws1inqTUDJwwv_zsdCDSJ37FA';

// Criação do cliente Supabase
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export default supabase;
