# Jodit Rich Text Editor Integration

The Admin Panel now includes Jodit, a powerful and easy-to-use WYSIWYG editor for creating and editing blog posts.

## Features

### Text Formatting

- **Bold** - Make text bold
- **Italic** - Make text italic
- **Underline** - Underline text
- **Strikethrough** - Strike through text
- **Superscript** - Superscript text
- **Subscript** - Subscript text

### Lists

- **Unordered List** - Bullet points
- **Ordered List** - Numbered list
- **Indent/Outdent** - Adjust list indentation

### Styling

- **Font** - Change font family
- **Font Size** - Adjust text size
- **Color Brush** - Change text color
- **Paragraph** - Paragraph formatting

### Content

- **Image** - Insert images (base64 encoded)
- **Link** - Add hyperlinks
- **Horizontal Rule** - Insert divider

### Other

- **Align** - Text alignment (left, center, right, justify)
- **Undo/Redo** - Undo and redo actions
- **Eraser** - Clear formatting
- **Fullscreen** - Fullscreen editing mode

## Component Usage

### Basic Usage

```jsx
import RichTextEditor from "@/components/ui/RichTextEditor";

<RichTextEditor
  value={content}
  onChange={(newContent) => setContent(newContent)}
  placeholder="Enter content..."
  height={400}
/>;
```

### Props

- `value` (string) - Current editor content (HTML)
- `onChange` (function) - Callback when content changes
- `placeholder` (string) - Placeholder text (default: "Enter content...")
- `className` (string) - Additional CSS classes
- `height` (number) - Editor height in pixels (default: 400)

## Integration in Posts

The RichTextEditor is integrated into the Post form:

1. **Create Post** - Click "Create Post" button
2. **Edit Content** - Use the rich text editor
3. **Generate with AI** - Click "Generate with AI" to auto-populate content
4. **Save** - Click "Create Post" or "Update Post"

## Features

### AI Content Generation

- Enter a post title
- Click "Generate with AI"
- Content is automatically generated and inserted into the editor
- Edit as needed before saving

### HTML Output

The editor stores content as HTML, which can be:

- Displayed directly in blog posts
- Converted to markdown if needed
- Stored in database as-is

## Configuration

The editor is configured with:

- Toolbar with essential formatting buttons
- Middle-sized toolbar buttons
- Base64 image encoding (images embedded in content)
- HTML paste support
- Fullscreen mode support

## Customization

To customize the editor, modify the `config` object in `RichTextEditor.jsx`:

```jsx
const config = {
  readonly: false,
  placeholder: placeholder,
  height: height,
  toolbar: true,
  toolbarButtonSize: "middle",
  buttons: [
    // Add or remove buttons here
    "bold",
    "italic",
    // ...
  ],
  // Add more config options
};
```

## Available Buttons

- `bold` - Bold text
- `italic` - Italic text
- `underline` - Underline text
- `strikethrough` - Strikethrough text
- `superscript` - Superscript
- `subscript` - Subscript
- `ul` - Unordered list
- `ol` - Ordered list
- `outdent` - Decrease indent
- `indent` - Increase indent
- `font` - Font family
- `fontsize` - Font size
- `brush` - Text color
- `paragraph` - Paragraph formatting
- `image` - Insert image
- `link` - Insert link
- `align` - Text alignment
- `undo` - Undo
- `redo` - Redo
- `hr` - Horizontal rule
- `eraser` - Clear formatting
- `fullsize` - Fullscreen mode

## Tips

1. **Images** - Images are embedded as base64, making content self-contained
2. **HTML** - Content is stored as HTML, preserving all formatting
3. **Fullscreen** - Use fullscreen mode for distraction-free editing
4. **Keyboard Shortcuts** - Standard shortcuts work (Ctrl+B for bold, etc.)

## Browser Support

Jodit works in all modern browsers:

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

Jodit is lightweight and performant:

- Fast initialization
- Smooth editing experience
- Efficient DOM updates
- Handles large documents well

## Accessibility

The editor includes:

- Keyboard navigation
- ARIA labels
- Screen reader support
- Focus management
