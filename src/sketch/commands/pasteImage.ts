import { Document, UI, Image } from 'sketch';
import { AllLayers, ShapeType, Style, Types } from 'sketch/dom';

const document = Document.getSelectedDocument();

/**
 * 获取粘贴的图片
 **/
const getImageFromPasteboard = (): NSImage | undefined => {
  const pasteboard = NSPasteboard.generalPasteboard();

  const imgData = pasteboard.dataForType(NSPasteboardTypePNG);
  const imgTiffData = pasteboard.dataForType(NSPasteboardTypeTIFF);

  if (imgData || imgTiffData) {
    if (imgData) {
      return NSImage.alloc().initWithData(imgData);
    }
    if (imgTiffData) {
      return NSImage.alloc().initWithData(imgTiffData);
    }
  }
};

/**
 * 粘贴为图片填充
 */
export const pasteImageToLayer = (layer: ShapeType) => {
  const image = getImageFromPasteboard();

  if (!image) {
    UI.message('剪切板没有图片😶');
    return;
  }
  const fills = (layer as ShapeType).style.fills;

  const imageLayer = new Image({
    image,
  });

  if (fills.length === 0) {
    fills.push({
      fill: Style.FillType.Pattern,
      enabled: true,
      pattern: {
        patternType: 'Fill',
        image: imageLayer.image,
        tileScale: 1,
      },
    });
  } else {
    fills.pop();
    fills.push({
      fill: Style.FillType.Pattern,
      enabled: true,
      pattern: {
        patternType: 'Fill',
        image: imageLayer.image,
        tileScale: 1,
      },
    });
  }
};

/**
 * 超级粘贴方法
 **/
const loopPasteToLayer = (layer: AllLayers) => {
  switch (layer.type) {
    // 图层对象
    // 粘贴图片
    case Types.Shape:
    case Types.ShapePath:
      const image = getImageFromPasteboard();

      if (!image) {
        UI.message('剪切板没有图片😶');
        return;
      }
      pasteImageToLayer(layer);
      return;

    case Types.Text:
    case Types.SymbolInstance:
    case Types.HotSpot:
    case Types.Image:
      return;
    default:
      // 开始递归
      if (layer.layers.length > 0) {
        layer.layers.forEach(loopPasteToLayer);
      }
  }
};

export const pasteToImage = () => {
  const selection = document.selectedLayers;

  try {
    selection.forEach(loopPasteToLayer);
  } catch (e) {
    UI.message('剪切板中没有图片😶');
  }
};
