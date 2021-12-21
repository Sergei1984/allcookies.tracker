use geo_types::Geometry;
use geozero::wkb::FromWkb;
use geozero::wkb::WkbDialect;
use geozero::CoordDimensions;
use geozero::GeomProcessor;
use geozero::GeozeroGeometry;
use serde::{Deserialize, Serialize};
use std::io::Read;

#[derive(Debug, PartialEq, Default, Clone, Serialize, Deserialize)]
pub struct LatLonPoint {
    pub lat: f64,
    pub lon: f64,
}

impl Copy for LatLonPoint {}

impl GeozeroGeometry for LatLonPoint {
    fn process_geom<P: GeomProcessor>(
        &self,
        processor: &mut P,
    ) -> std::result::Result<(), geozero::error::GeozeroError> {
        processor.point_begin(0)?;
        processor.coordinate(self.lon, self.lat, None, None, None, None, 0)?;
        processor.point_end(0)
    }

    fn dims(&self) -> CoordDimensions {
        CoordDimensions::xyz()
    }
}

impl GeomProcessor for LatLonPoint {
    fn dimensions(&self) -> CoordDimensions {
        CoordDimensions::xyz()
    }
    fn coordinate(
        &mut self,
        x: f64,
        y: f64,
        _z: Option<f64>,
        _m: Option<f64>,
        _t: Option<f64>,
        _tm: Option<u64>,
        _idx: usize,
    ) -> geozero::error::Result<()> {
        self.lon = x;
        self.lat = y;
        Ok(())
    }
}

impl FromWkb for LatLonPoint {
    fn from_wkb<R: Read>(rdr: &mut R, dialect: WkbDialect) -> geozero::error::Result<Self> {
        let mut pt = LatLonPoint::default();
        geozero::wkb::process_wkb_type_geom(rdr, &mut pt, dialect)?;
        Ok(pt)
    }
}

mod postgis_sqlx_macros {
    geozero::impl_sqlx_postgis_type_info!(super::LatLonPoint);
    geozero::impl_sqlx_postgis_decode!(super::LatLonPoint);
    geozero::impl_sqlx_postgis_encode!(super::LatLonPoint);
}

impl From<LatLonPoint> for Geometry<f64> {
    fn from(src: LatLonPoint) -> Geometry<f64> {
        Geometry::Point(geo_types::Point::new(src.lon, src.lat))
    }
}
