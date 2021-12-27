use sqlx::{Postgres, Transaction};

pub struct PersistentActivityRepo<'c> {
    db: &'c Transaction<'c, Postgres>,
}

impl<'c> PersistentActivityRepo<'c> {
    pub fn new(db: &'c Transaction<'c, Postgres>) -> Self {
        PersistentActivityRepo { db: db }
    }
}
