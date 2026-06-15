const HuskyLensColorBlock = "#8B4513";

// ---------------------------------------------------------------------------
// huskylens_i2c_init
// ---------------------------------------------------------------------------
Blockly.Blocks['huskylens_i2c_init'] = {
  init: function () {
    this.jsonInit({
      type: "huskylens_i2c_init",
      message0: Blockly.Msg.HUSKYLENS_I2C_INIT,
      previousStatement: null,
      nextStatement: null,
      args0: [],
      colour: HuskyLensColorBlock,
      tooltip: Blockly.Msg.HUSKYLENS_I2C_INIT_TOOLTIP,
      helpUrl: ""
    });
  }
};

Blockly.Python['huskylens_i2c_init'] = function (block) {
  Blockly.Python.definitions_['import_yolobit'] = 'from yolobit import *';
  Blockly.Python.definitions_['import_huskylens'] = 'from HuskyLens import HuskyLens';
  Blockly.Python.definitions_['init_huskylens'] = 'husky = HuskyLens(sda_pin=pin20.pin, scl_pin=pin19.pin)';
  return '';
};

// ---------------------------------------------------------------------------
// huskylens_update_block  (Face / ObjectTracking / ObjectRecognition / Color / Tag)
// ---------------------------------------------------------------------------
Blockly.Blocks["huskylens_update_block"] = {
  init: function () {
    this.jsonInit({
      type: "huskylens_update_block",
      colour: HuskyLensColorBlock,
      tooltip: Blockly.Msg.HUSKYLENS_UPDATE_BLOCK_TOOLTIP,
      message0: Blockly.Msg.HUSKYLENS_UPDATE_BLOCK,
      previousStatement: null,
      nextStatement: null,
      args0: [
        {
          type: "field_dropdown",
          name: "OBJECT_TYPE",
          options: [
            ["Face Recognition", "FaceRecognition"],
            ["Object Tracking", "ObjectTracking"],
            ["Object Recognition", "ObjectRecognition"],
            ["Color Recognition", "ColorRecognition"],
            ["Tag Recognition", "TagRecognition"]
          ]
        },
        {
          type: "field_dropdown",
          name: "OBJECT_ID",
          options: [
            ["1", "1"], ["2", "2"], ["3", "3"]
          ]
        }
      ],
      helpUrl: ""
    });
  }
};

Blockly.Python['huskylens_update_block'] = function (block) {
  var objectType = block.getFieldValue('OBJECT_TYPE');
  var objectId = block.getFieldValue('OBJECT_ID');
  var algoMap = {
    'FaceRecognition': 0,
    'ObjectTracking': 1,
    'ObjectRecognition': 2,
    'ColorRecognition': 4,
    'TagRecognition': 5
  };
  var algo = algoMap[objectType];
  Blockly.Python.definitions_['huskylens_block_var_' + objectId] =
    '_husky_block_' + objectId + ' = {"x": 0, "y": 0, "w": 0, "h": 0}';
  var code = 'husky.set_algorithm(' + algo + ')\n';
  code += 'global _husky_block_' + objectId + '\n';
  code += '_husky_block_' + objectId + ' = await husky.get_block(' + objectId + ')\n';
  return code;
};

// ---------------------------------------------------------------------------
// huskylens_bounding_box  (đọc x / y / w / h của object theo ID)
// ---------------------------------------------------------------------------
Blockly.Blocks["huskylens_bounding_box"] = {
  init: function () {
    this.jsonInit({
      type: "huskylens_bounding_box",
      colour: HuskyLensColorBlock,
      tooltip: Blockly.Msg.HUSKYLENS_BOUNDING_BOX_TOOLTIP,
      message0: Blockly.Msg.HUSKYLENS_BOUNDING_BOX,
      output: "Number",
      args0: [
        {
          type: "field_dropdown",
          name: "DATA_TYPE",
          options: [
            [Blockly.Msg.HUSKYLENS_BBOX_X_CENTER, "x"],
            [Blockly.Msg.HUSKYLENS_BBOX_Y_CENTER, "y"],
            [Blockly.Msg.HUSKYLENS_BBOX_WIDTH, "w"],
            [Blockly.Msg.HUSKYLENS_BBOX_HEIGHT, "h"]
          ]
        },
        {
          type: "field_dropdown",
          name: "OBJECT_ID",
          options: [
            ["1", "1"], ["2", "2"], ["3", "3"]
          ]
        }
      ],
      helpUrl: ""
    });
  }
};

Blockly.Python['huskylens_bounding_box'] = function (block) {
  var dataType = block.getFieldValue('DATA_TYPE');
  var objectId = block.getFieldValue('OBJECT_ID');
  Blockly.Python.definitions_['huskylens_block_var_' + objectId] =
    '_husky_block_' + objectId + ' = {"x": 0, "y": 0, "w": 0, "h": 0}';
  var code = '_husky_block_' + objectId + '["' + dataType + '"]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

// ---------------------------------------------------------------------------
// huskylens_update_arrow  (Line Tracking algorithm)
// ---------------------------------------------------------------------------
Blockly.Blocks["huskylens_update_arrow"] = {
  init: function () {
    this.jsonInit({
      type: "huskylens_update_arrow",
      colour: HuskyLensColorBlock,
      tooltip: Blockly.Msg.HUSKYLENS_UPDATE_ARROW_TOOLTIP,
      message0: Blockly.Msg.HUSKYLENS_UPDATE_ARROW,
      previousStatement: null,
      nextStatement: null,
      args0: [],
      helpUrl: ""
    });
  }
};

Blockly.Python['huskylens_update_arrow'] = function (block) {
  Blockly.Python.definitions_['huskylens_arrow_var'] =
    '_husky_arrow = {"xo": 0, "yo": 0, "xt": 0, "yt": 0}';
  var code = 'husky.set_algorithm(3)\n';
  code += 'global _husky_arrow\n';
  code += '_husky_arrow = await husky.get_arrow()\n';
  return code;
};

// ---------------------------------------------------------------------------
// huskylens_line_tracking  (đọc xo / yo / xt / yt của arrow)
// ---------------------------------------------------------------------------
Blockly.Blocks["huskylens_line_tracking"] = {
  init: function () {
    this.jsonInit({
      type: "huskylens_line_tracking",
      colour: HuskyLensColorBlock,
      tooltip: Blockly.Msg.HUSKYLENS_LINE_TRACKING_TOOLTIP,
      message0: Blockly.Msg.HUSKYLENS_LINE_TRACKING,
      output: "Number",
      args0: [
        {
          type: "field_dropdown",
          name: "POINT_TYPE",
          options: [
            [Blockly.Msg.HUSKYLENS_LINE_X_TAIL, "xo"],
            [Blockly.Msg.HUSKYLENS_LINE_Y_TAIL, "yo"],
            [Blockly.Msg.HUSKYLENS_LINE_X_HEAD, "xt"],
            [Blockly.Msg.HUSKYLENS_LINE_Y_HEAD, "yt"]
          ]
        }
      ],
      helpUrl: ""
    });
  }
};

Blockly.Python['huskylens_line_tracking'] = function (block) {
  var pointType = block.getFieldValue('POINT_TYPE');
  Blockly.Python.definitions_['huskylens_arrow_var'] =
    '_husky_arrow = {"xo": 0, "yo": 0, "xt": 0, "yt": 0}';
  var code = '_husky_arrow["' + pointType + '"]';
  return [code, Blockly.Python.ORDER_MEMBER];
};

// ---------------------------------------------------------------------------
// huskylens_update_classification  (Object Classification – algo 6)
// ---------------------------------------------------------------------------
Blockly.Blocks["huskylens_update_classification"] = {
  init: function () {
    this.jsonInit({
      type: "huskylens_update_classification",
      colour: HuskyLensColorBlock,
      tooltip: Blockly.Msg.HUSKYLENS_UPDATE_CLASSIFICATION_TOOLTIP,
      message0: Blockly.Msg.HUSKYLENS_UPDATE_CLASSIFICATION,
      previousStatement: null,
      nextStatement: null,
      args0: [],
      helpUrl: ""
    });
  }
};

Blockly.Python['huskylens_update_classification'] = function (block) {
  Blockly.Python.definitions_['huskylens_classification_var'] = '_husky_cls_id = 0';
  var code = 'husky.set_algorithm(6)\n';
  code += 'global _husky_cls_id\n';
  code += '_husky_cls_id = (await husky.get_any_block())["id"]\n';
  return code;
};
