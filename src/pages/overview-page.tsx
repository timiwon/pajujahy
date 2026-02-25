
export function OverviewPage() {
  return (
    <section id="main">
      <div className="intro">
        <p>Key data at a glance</p>
      </div>

      <h1 className="title-bottom">Overview</h1>

      <div className="dataTables_header">
        <div className="flex flex-col items-start">
          <h2>Web Hosting and Domain Log</h2>
        </div>
        <button id="productLogTabledataTables_filter_btn" className="btn dataTables_filter_btn">
          <div className="dataTables_filter_btn_icon" />
        </button>
      </div>
    </section>
  );
}
