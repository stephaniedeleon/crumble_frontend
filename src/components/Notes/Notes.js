import "./Notes.css";

export default function Notes() {
  return (
    <div className="Notes">
      <div className="title" style={{ userSelect: "none" }}>
        <div className="compName">
          <h6>Notes</h6>
        </div>

        <div className="addBtn">
          <i class="bi-journal-plus"></i>
        </div>

        {/* <AddNote
            mainId={mainId}
            subId={subId}
            show={modalShow}
            onHide={() => setModalShow(false)}
        /> */}
      </div>
    </div>
  );
}
