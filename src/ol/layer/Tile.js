/**
 * @module ol/layer/Tile
 */
import {inherits} from '../index.js';
import LayerType from '../LayerType.js';
import Layer from '../layer/Layer.js';
import TileProperty from '../layer/TileProperty.js';
import {assign} from '../obj.js';

/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @constructor
 * @extends {ol.layer.Layer}
 * @fires ol.render.Event
 * @param {olx.layer.TileOptions=} opt_options Tile layer options.
 * @api
 */
const TileLayer = function(opt_options) {
  const options = opt_options ? opt_options : {};

  const baseOptions = assign({}, options);

  delete baseOptions.preload;
  delete baseOptions.useInterimTilesOnError;
  Layer.call(this,  /** @type {olx.layer.LayerOptions} */ (baseOptions));

  this.setPreload(options.preload !== undefined ? options.preload : 0);
  this.setUseInterimTilesOnError(options.useInterimTilesOnError !== undefined ?
    options.useInterimTilesOnError : true);

  /**
   * The layer type.
   * @protected
   * @type {module:ol/LayerType~LayerType}
   */
  this.type = LayerType.TILE;

};

inherits(TileLayer, Layer);


/**
 * Return the level as number to which we will preload tiles up to.
 * @return {number} The level to preload tiles up to.
 * @observable
 * @api
 */
TileLayer.prototype.getPreload = function() {
  return /** @type {number} */ (this.get(TileProperty.PRELOAD));
};


/**
 * Return the associated {@link ol.source.Tile tilesource} of the layer.
 * @function
 * @return {ol.source.Tile} Source.
 * @api
 */
TileLayer.prototype.getSource;


/**
 * Set the level as number to which we will preload tiles up to.
 * @param {number} preload The level to preload tiles up to.
 * @observable
 * @api
 */
TileLayer.prototype.setPreload = function(preload) {
  this.set(TileProperty.PRELOAD, preload);
};


/**
 * Whether we use interim tiles on error.
 * @return {boolean} Use interim tiles on error.
 * @observable
 * @api
 */
TileLayer.prototype.getUseInterimTilesOnError = function() {
  return /** @type {boolean} */ (this.get(TileProperty.USE_INTERIM_TILES_ON_ERROR));
};


/**
 * Set whether we use interim tiles on error.
 * @param {boolean} useInterimTilesOnError Use interim tiles on error.
 * @observable
 * @api
 */
TileLayer.prototype.setUseInterimTilesOnError = function(useInterimTilesOnError) {
  this.set(TileProperty.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
};
export default TileLayer;
