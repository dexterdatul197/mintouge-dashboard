import PropTypes from "prop-types"
import React from "react"

const SmallCard = (props) => {
  const { report } = props

  return (
    <div className="p-3 border-1">
      <div className="d-flex align-items-center mb-3">
        <div className="small-card-color-box me-3" style={{ "backgroundColor": report.color }} />
        <h5 className="font-size-14 mb-0">{report.title}</h5>
      </div>
      <div className="text-muted mt-4">
        <h4>
          {report.value}
        </h4>
        <div>
          <span className="text-truncate">{report.desc}</span>
        </div>
      </div>
    </div>
  )
}

SmallCard.propTypes = {
  reports: PropTypes.array,
}

export default SmallCard
