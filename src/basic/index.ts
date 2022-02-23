// @ts-ignore
import { exampleSetup } from "prosemirror-example-setup";
import { Schema } from "prosemirror-model";
import { EditorView } from "prosemirror-view";
import { EditorState, TextSelection } from "prosemirror-state";
import { schema } from "prosemirror-schema-basic";
import { addListNodes } from "prosemirror-schema-list";
import { clear } from "../utils";
import docJSON from "./doc.json";
declare var global: any;

//This is a very basic schema
var editorSchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
});

export default function () {
  clear();
  //This is available on `window.view` in your chrome console
  global.view = new EditorView(document.getElementById("mount"), {
    state:
      EditorState.create({
        doc: editorSchema.nodeFromJSON(docJSON),
        plugins: exampleSetup({
          schema: editorSchema
        })
      }),
    handleTextInput: (view, from, to, text) => {
      let tr = view.state.tr;
      tr.insertText(text, from, to);
      tr.setSelection(TextSelection.create(tr.doc, tr.mapping.map(to)));
      view.dispatch(tr);
      return true;
    }
  })
}