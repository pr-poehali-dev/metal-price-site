CREATE TABLE IF NOT EXISTS t_p84833296_metal_price_site.visitors (
    id SERIAL PRIMARY KEY,
    visitor_id VARCHAR(255) UNIQUE NOT NULL,
    first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    visit_count INTEGER DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_visitor_id ON t_p84833296_metal_price_site.visitors(visitor_id);
CREATE INDEX IF NOT EXISTS idx_first_visit ON t_p84833296_metal_price_site.visitors(first_visit);