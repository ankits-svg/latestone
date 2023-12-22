<div className="leftDivStyle" >
        <div className="template">
          <img src="https://i.ibb.co/pPL1QB3/leftdiv.png" alt="temp" />
          {/* <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/103572350/291668301-8abfda8d-ca09-45a2-a139-fbf561592c9a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWNJYAX4CSVEH53A%2F20231219%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20231219T173634Z&X-Amz-Expires=300&X-Amz-Signature=95468014ee86865509ea8a3cb411b09ae89a830dc326601faf662ecdd31681d6&X-Amz-SignedHeaders=host&actor_id=103572350&key_id=0&repo_id=497514745" alt="alt" /> */}
        </div>

        <div className="contentStyle">
          <h1 class="top-right" >
            <span class="byte">byte</span>
            <sup class="xl">XL</sup>
          </h1>
          <div className="title">Certificate</div>
          <div className="title1">of</div>
          <div className="title2">{data.type}</div>
          <div className="certify-text">This is to certify that</div>
          <div className="name">{data.name}</div>
          <div className="assessment-text">
          has successfully cleared the assessment for the skill
          </div>
          <div className="programming-language">{data.course}</div>
          <div class="footer">
            <div class="bet-1">
              <h3>
                <strong class="date">
                  
                  {new Date().toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </strong>
              </h3>
              <h4>Date of Achievement</h4>
            </div>
            <div class="bet">
              <img
                width="50%"
                src="https://ankit-123.my.canva.site/098/images/219f937dae02a117e97806b886894bfd.png"
                alt="sign"
              />
              <h3>Karun Tadepalli</h3>
              <h4>CEO & Co-founder</h4>
            </div>
          </div>
        </div>
      </div>