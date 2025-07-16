
-- Civilization System Tables
CREATE TABLE public.player_civilizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  civilization_name TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  experience INTEGER DEFAULT 0,
  population INTEGER DEFAULT 100,
  happiness INTEGER DEFAULT 50,
  culture_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- Resources for each civilization
CREATE TABLE public.civilization_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  civilization_id UUID REFERENCES public.player_civilizations(id) ON DELETE CASCADE NOT NULL,
  wood INTEGER DEFAULT 100,
  stone INTEGER DEFAULT 50,
  gold INTEGER DEFAULT 100,
  food INTEGER DEFAULT 80,
  iron INTEGER DEFAULT 20,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Buildings in civilization
CREATE TABLE public.civilization_buildings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  civilization_id UUID REFERENCES public.player_civilizations(id) ON DELETE CASCADE NOT NULL,
  building_type TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  position_x INTEGER DEFAULT 0,
  position_y INTEGER DEFAULT 0,
  construction_start TIMESTAMP WITH TIME ZONE,
  construction_end TIMESTAMP WITH TIME ZONE,
  is_completed BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Technologies research
CREATE TABLE public.civilization_technologies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  civilization_id UUID REFERENCES public.player_civilizations(id) ON DELETE CASCADE NOT NULL,
  technology_name TEXT NOT NULL,
  research_progress INTEGER DEFAULT 0,
  is_completed BOOLEAN DEFAULT false,
  research_start TIMESTAMP WITH TIME ZONE,
  research_end TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Military units
CREATE TABLE public.civilization_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  civilization_id UUID REFERENCES public.player_civilizations(id) ON DELETE CASCADE NOT NULL,
  unit_type TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  experience INTEGER DEFAULT 0,
  position_x INTEGER DEFAULT 0,
  position_y INTEGER DEFAULT 0,
  health INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- World territories
CREATE TABLE public.world_territories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  territory_name TEXT NOT NULL,
  position_x INTEGER NOT NULL,
  position_y INTEGER NOT NULL,
  owner_id UUID REFERENCES public.player_civilizations(id) ON DELETE SET NULL,
  territory_type TEXT DEFAULT 'neutral',
  resource_bonus JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Trade offers between players
CREATE TABLE public.trade_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id UUID REFERENCES public.player_civilizations(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES public.player_civilizations(id) ON DELETE CASCADE NOT NULL,
  offered_resources JSONB NOT NULL,
  requested_resources JSONB NOT NULL,
  status TEXT DEFAULT 'pending',
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '24 hours'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Alliance system
CREATE TABLE public.civilization_alliances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  civilization1_id UUID REFERENCES public.player_civilizations(id) ON DELETE CASCADE NOT NULL,
  civilization2_id UUID REFERENCES public.player_civilizations(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(civilization1_id, civilization2_id)
);

-- Battle logs
CREATE TABLE public.battle_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  attacker_id UUID REFERENCES public.player_civilizations(id) ON DELETE CASCADE NOT NULL,
  defender_id UUID REFERENCES public.player_civilizations(id) ON DELETE CASCADE,
  territory_id UUID REFERENCES public.world_territories(id) ON DELETE SET NULL,
  battle_result JSONB NOT NULL,
  winner_id UUID REFERENCES public.player_civilizations(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- World events
CREATE TABLE public.world_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL,
  affected_civilizations UUID[],
  is_global BOOLEAN DEFAULT false,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Player inventory
CREATE TABLE public.player_inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  civilization_id UUID REFERENCES public.player_civilizations(id) ON DELETE CASCADE NOT NULL,
  item_type TEXT NOT NULL,
  item_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  item_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.player_civilizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civilization_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civilization_buildings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civilization_technologies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civilization_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.world_territories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trade_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.civilization_alliances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.battle_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.world_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_inventory ENABLE ROW LEVEL SECURITY;

-- RLS Policies for player_civilizations
CREATE POLICY "Users can view their own civilization" ON public.player_civilizations
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own civilization" ON public.player_civilizations
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own civilization" ON public.player_civilizations
FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view other civilizations for gameplay" ON public.player_civilizations
FOR SELECT USING (true);

-- RLS Policies for civilization_resources
CREATE POLICY "Users can manage their civilization resources" ON public.civilization_resources
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE id = civilization_resources.civilization_id 
    AND user_id = auth.uid()
  )
);

-- RLS Policies for civilization_buildings
CREATE POLICY "Users can manage their civilization buildings" ON public.civilization_buildings
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE id = civilization_buildings.civilization_id 
    AND user_id = auth.uid()
  )
);

-- RLS Policies for civilization_technologies
CREATE POLICY "Users can manage their civilization technologies" ON public.civilization_technologies
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE id = civilization_technologies.civilization_id 
    AND user_id = auth.uid()
  )
);

-- RLS Policies for civilization_units
CREATE POLICY "Users can manage their civilization units" ON public.civilization_units
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE id = civilization_units.civilization_id 
    AND user_id = auth.uid()
  )
);

-- RLS Policies for world_territories
CREATE POLICY "Everyone can view territories" ON public.world_territories
FOR SELECT USING (true);

CREATE POLICY "Territory owners can update their territories" ON public.world_territories
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE id = world_territories.owner_id 
    AND user_id = auth.uid()
  )
);

-- RLS Policies for trade_offers
CREATE POLICY "Users can view trade offers involving them" ON public.trade_offers
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE (id = trade_offers.sender_id OR id = trade_offers.receiver_id) 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create trade offers" ON public.trade_offers
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE id = trade_offers.sender_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update trade offers they're involved in" ON public.trade_offers
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE (id = trade_offers.sender_id OR id = trade_offers.receiver_id) 
    AND user_id = auth.uid()
  )
);

-- RLS Policies for civilization_alliances
CREATE POLICY "Users can view alliances involving them" ON public.civilization_alliances
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE (id = civilization_alliances.civilization1_id OR id = civilization_alliances.civilization2_id) 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create alliance requests" ON public.civilization_alliances
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE id = civilization_alliances.civilization1_id 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can update alliances they're involved in" ON public.civilization_alliances
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE (id = civilization_alliances.civilization1_id OR id = civilization_alliances.civilization2_id) 
    AND user_id = auth.uid()
  )
);

-- RLS Policies for battle_logs
CREATE POLICY "Users can view battles involving them" ON public.battle_logs
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE (id = battle_logs.attacker_id OR id = battle_logs.defender_id) 
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create battle logs" ON public.battle_logs
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE id = battle_logs.attacker_id 
    AND user_id = auth.uid()
  )
);

-- RLS Policies for world_events
CREATE POLICY "Everyone can view world events" ON public.world_events
FOR SELECT USING (true);

-- RLS Policies for player_inventory
CREATE POLICY "Users can manage their inventory" ON public.player_inventory
FOR ALL USING (
  EXISTS (
    SELECT 1 FROM public.player_civilizations 
    WHERE id = player_inventory.civilization_id 
    AND user_id = auth.uid()
  )
);

-- Enable realtime for all tables
ALTER TABLE public.player_civilizations REPLICA IDENTITY FULL;
ALTER TABLE public.civilization_resources REPLICA IDENTITY FULL;
ALTER TABLE public.civilization_buildings REPLICA IDENTITY FULL;
ALTER TABLE public.civilization_technologies REPLICA IDENTITY FULL;
ALTER TABLE public.civilization_units REPLICA IDENTITY FULL;
ALTER TABLE public.world_territories REPLICA IDENTITY FULL;
ALTER TABLE public.trade_offers REPLICA IDENTITY FULL;
ALTER TABLE public.civilization_alliances REPLICA IDENTITY FULL;
ALTER TABLE public.battle_logs REPLICA IDENTITY FULL;
ALTER TABLE public.world_events REPLICA IDENTITY FULL;
ALTER TABLE public.player_inventory REPLICA IDENTITY FULL;

-- Add tables to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.player_civilizations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.civilization_resources;
ALTER PUBLICATION supabase_realtime ADD TABLE public.civilization_buildings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.civilization_technologies;
ALTER PUBLICATION supabase_realtime ADD TABLE public.civilization_units;
ALTER PUBLICATION supabase_realtime ADD TABLE public.world_territories;
ALTER PUBLICATION supabase_realtime ADD TABLE public.trade_offers;
ALTER PUBLICATION supabase_realtime ADD TABLE public.civilization_alliances;
ALTER PUBLICATION supabase_realtime ADD TABLE public.battle_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.world_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.player_inventory;

-- Functions for automatic resource generation
CREATE OR REPLACE FUNCTION public.generate_resources()
RETURNS void AS $$
BEGIN
  UPDATE public.civilization_resources 
  SET 
    wood = wood + 10,
    stone = stone + 5,
    gold = gold + 8,
    food = food + 12,
    iron = iron + 3,
    updated_at = now()
  WHERE updated_at < now() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create initial civilization
CREATE OR REPLACE FUNCTION public.create_initial_civilization(
  p_user_id UUID,
  p_civilization_name TEXT
)
RETURNS UUID AS $$
DECLARE
  civilization_id UUID;
BEGIN
  -- Create civilization
  INSERT INTO public.player_civilizations (user_id, civilization_name)
  VALUES (p_user_id, p_civilization_name)
  RETURNING id INTO civilization_id;
  
  -- Initialize resources
  INSERT INTO public.civilization_resources (civilization_id)
  VALUES (civilization_id);
  
  -- Add starting buildings
  INSERT INTO public.civilization_buildings (civilization_id, building_type, position_x, position_y)
  VALUES 
    (civilization_id, 'town_hall', 0, 0),
    (civilization_id, 'house', 1, 0),
    (civilization_id, 'farm', 0, 1);
  
  -- Add starting units
  INSERT INTO public.civilization_units (civilization_id, unit_type, quantity)
  VALUES 
    (civilization_id, 'worker', 3),
    (civilization_id, 'warrior', 2);
    
  RETURN civilization_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
